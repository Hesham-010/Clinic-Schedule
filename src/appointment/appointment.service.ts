import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClinicDoctor } from 'src/clinic/entities/clinic-doctor.entity';
import { ClinicSchedules } from 'src/clinic/entities/clinic-schedule.entity';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { DoctorSchedules } from 'src/doctor/entities/doctor-schedule.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { ServiceSchedules } from 'src/services/entities/service-schedule.entity';
import { Service } from 'src/services/entities/service.entity';
import { Appointment } from './entities/appointment.entity';
import { SlotDto } from './dto/slot.dto';
import { DaysEnum } from 'src/utils/enums/schedule.enum';
import { Op } from 'sequelize';
import { minutesToTime, timeToMinutes } from 'src/utils/enums/parse-time';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Clinic) private clinicModel: typeof Clinic,
    @InjectModel(ClinicSchedules)
    private clinicSchedulesModel: typeof ClinicSchedules,
    @InjectModel(Service) private serviceModel: typeof Service,
    @InjectModel(ServiceSchedules)
    private serviceSchedulesModel: typeof ServiceSchedules,
    @InjectModel(Doctor) private doctorModel: typeof Doctor,
    @InjectModel(DoctorSchedules)
    private doctorSchedulesModel: typeof DoctorSchedules,
    @InjectModel(ClinicDoctor) private clinicDoctorModel: typeof ClinicDoctor,
    @InjectModel(Appointment) private appointmentModel: typeof Appointment,
  ) {}

  async getSlots(dto: SlotDto) {
    const { clinicId, serviceId, date } = dto;

    // Check if clinic exist
    const clinic = await this.clinicModel.findByPk(clinicId);
    if (!clinic) throw new NotFoundException('Clinic not found');

    // Check if service exist
    const service = await this.serviceModel.findByPk(serviceId);
    if (!service) throw new NotFoundException('Service not found');

    // Get Day name
    const dayIndex = new Date(date).getDay();
    const daysArray = Object.values(DaysEnum);
    const dayName = daysArray[dayIndex];

    // clinicOpen and clinicClose
    const clinicSchedule = await this.clinicSchedulesModel.findOne({
      where: { clinicId, day: dayName },
    });
    const clinicOpen = clinicSchedule?.openingTime || '00:00:00';
    const clinicClose = clinicSchedule?.closingTime || '23:59:59';
    if (clinicSchedule?.isClosed) return 'Clinic Closed';

    // serviceOpen and serviceClose
    const serviceSchedule = await this.serviceSchedulesModel.findOne({
      where: { clinicId, serviceId, day: dayName },
    });
    const serviceOpen = serviceSchedule?.openTime || clinicOpen;
    const serviceClose = serviceSchedule?.endTime || clinicClose;

    const slotMinutes = service.slotMinutes || 30;
    const serviceRequiresDoctor = service.requiresDoctor ?? true;
    const serviceParallel = service.parallel ?? false;

    // Return slots if service don't require doctores
    if (!serviceRequiresDoctor) {
      const appointments = await this.appointmentModel.findAll({
        where: {
          clinicId,
          serviceId,
          day: dayName,
        },
      });

      // Booking times in minutes
      const bookedMinutes = appointments.map((a) => timeToMinutes(a.startTime));

      const startMin = Math.max(
        timeToMinutes(serviceOpen),
        timeToMinutes(clinicOpen),
      );
      const endMin = Math.min(
        timeToMinutes(serviceClose),
        timeToMinutes(clinicClose),
      );

      const slots: { start: string; end: string }[] = [];
      for (
        let min = startMin;
        min + slotMinutes <= endMin;
        min += slotMinutes
      ) {
        const isBooked = bookedMinutes.includes(min);
        if (isBooked) continue;

        slots.push({
          start: minutesToTime(min),
          end: minutesToTime(min + slotMinutes),
        });
      }

      return { date, clinicId, serviceId, slots };
    }

    // Get doctors
    const clinicDoctor = await this.clinicDoctorModel.findAll({
      where: { clinicId },
      attributes: ['doctorId'],
      raw: true,
    });

    const doctorIds = clinicDoctor.map((d) => d.doctorId);
    if (doctorIds.length === 0) return { date, clinicId, serviceId, slots: [] };

    // fetch doctor schedules for those doctors on that day for this clinic & service
    const doctorSchedules = await this.doctorSchedulesModel.findAll({
      where: { clinicId, serviceId, doctorId: doctorIds, day: dayName },
    });

    // find appointments for this service
    const appts = await this.appointmentModel.findAll({
      where: {
        clinicId,
        serviceId,
        day: dayName,
        startTime: { [Op.between]: [serviceOpen, serviceClose] },
      },
    });

    const apptArr = doctorIds.map((id) => ({
      doctorId: id,
      booked: appts
        .filter((a) => a.doctorId === id)
        .map((a) => timeToMinutes(a.startTime)),
    }));

    // Bookings schedule each doctor
    const globalBooked = new Set(apptArr.flatMap((d) => d.booked));

    // get slots per doctor per their schedule
    const slotList: { start: string; end: string; doctorId: number }[] = [];

    for (const ds of doctorSchedules) {
      const sMin = timeToMinutes(ds.openTime || serviceOpen || clinicOpen);
      const eMin = timeToMinutes(ds.endTime || serviceClose || clinicClose);
      const docId = ds.doctorId;

      const doctorEntry = apptArr.find((d) => d.doctorId === docId);
      const docBooked = new Set(doctorEntry?.booked || []);

      for (let m = sMin; m + slotMinutes <= eMin; m += slotMinutes) {
        const isDoctorBusy = docBooked.has(m);
        const isServiceBusy = !serviceParallel && globalBooked.has(m);

        if (isDoctorBusy || isServiceBusy) continue;

        slotList.push({
          start: minutesToTime(m),
          end: minutesToTime(m + slotMinutes),
          doctorId: docId,
        });
      }
    }

    return {
      date,
      clinicId,
      serviceId,
      slots: slotList.sort((a, b) => a.start.localeCompare(b.start)),
    };
  }
}
