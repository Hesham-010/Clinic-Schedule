import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClinicSchedules } from 'src/clinic/entities/clinic-schedule.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { parseTime } from 'src/utils/enums/parse-time';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { CreateDoctorScheduleDto } from '../dto/create-schedule.dto';
import { Service } from 'src/services/entities/service.entity';
import { DoctorSchedules } from '../entities/doctor-schedule.entity';
import { DoctorService } from './doctor.service';
import { ServiceSchedules } from 'src/services/entities/service-schedule.entity';

@Injectable()
export class DoctorScheduleService {
  constructor(
    @InjectModel(ClinicSchedules)
    private clinicScheduleModel: typeof ClinicSchedules,
    @InjectModel(ServiceSchedules)
    private serviceSchedulesModel: typeof ServiceSchedules,
    @InjectModel(Clinic) private clinicModel: typeof Clinic,
    @InjectModel(DoctorSchedules)
    private doctorSchedulesModel: typeof DoctorSchedules,
    private doctorService: DoctorService,
  ) {}

  async addDoctorSchedule(dto: CreateDoctorScheduleDto) {
    const { clinicId, serviceId, doctorId, day, openTime, endTime } = dto;

    if (parseTime(openTime) >= parseTime(endTime)) {
      throw new BadRequestException('endTime must be after openTime');
    }

    // Check if doctor schedule exist
    const existDoctorSchedule = await this.doctorSchedulesModel.findOne({
      where: {
        clinicId,
        serviceId,
        doctorId,
        day,
        [Op.and]: [
          { openTime: { [Op.lt]: endTime } },
          { endTime: { [Op.gt]: openTime } },
        ],
      },
    });

    if (existDoctorSchedule)
      throw new BadRequestException('Doctor Schedule is exist');

    // Check if doctor exist
    const doctor = await this.doctorService.findOne(doctorId);
    if (!doctor) throw new NotFoundException('Doctor not found');

    // Check if clinic exist
    const clinic = await this.clinicModel.findByPk(clinicId);
    if (!clinic) throw new NotFoundException('Clinic not found');

    // Check if clinic exist in this day
    const clinicSchedule = await this.clinicScheduleModel.findOne({
      where: { clinicId, day },
    });
    if (!clinicSchedule || clinicSchedule.isClosed)
      throw new NotFoundException('Clinic Not Found in this day');

    if (
      parseTime(openTime) < parseTime(clinicSchedule.openingTime) ||
      parseTime(endTime) > parseTime(clinicSchedule.closingTime)
    ) {
      throw new BadRequestException('This schedule is not allowed in clinic');
    }

    // Check if clinic exist in this day
    const serviceSchedule = await this.serviceSchedulesModel.findOne({
      where: { clinicId, serviceId, day },
    });
    if (!serviceSchedule)
      throw new NotFoundException('Service Not Found in this day');

    if (
      parseTime(openTime) < parseTime(serviceSchedule.openTime) ||
      parseTime(endTime) > parseTime(serviceSchedule.endTime)
    ) {
      throw new BadRequestException('This schedule is not allowed in clinic');
    }

    await this.doctorSchedulesModel.create({
      clinicId,
      serviceId,
      doctorId,
      day,
      openTime,
      endTime,
    } as any);
    return 'Doctor schedule added successfully.';
  }

  async schedules(doctorId: number) {
    const schedules = await this.doctorSchedulesModel.findAll({
      where: { doctorId },
      include: [
        { model: Clinic, attributes: ['name'] },
        { model: Service, attributes: ['name'] },
      ],
    });
    return schedules;
  }
}
