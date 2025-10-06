import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Clinic } from '../entities/clinic.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { ClinicDoctor } from '../entities/clinic-doctor.entity';

@Injectable()
export class ClinicDoctorService {
  constructor(
    @InjectModel(Clinic) private readonly clinicModel: typeof Clinic,
    @InjectModel(Doctor) private doctorModel: typeof Doctor,
    @InjectModel(ClinicDoctor) private clinicDoctorModel: typeof ClinicDoctor,
  ) {}

  async doctors(clinicId: number) {
    const clinic = await this.clinicModel.findByPk(clinicId, {
      include: [Doctor],
    });
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }

    return clinic.doctors;
  }

  async assignDoctor(clinicId: number, doctorId: number) {
    const clinic = await this.clinicModel.findByPk(clinicId);
    if (!clinic) throw new NotFoundException('Clinic not found');

    const doctor = await this.doctorModel.findByPk(doctorId);
    if (!doctor) throw new NotFoundException('Doctor not found');

    const clinicDoctor = await this.clinicDoctorModel.findOne({
      where: { clinicId, doctorId },
    });
    if (!clinicDoctor)
      throw new NotFoundException(
        'This Doctor Already assigned to this clinic',
      );

    await clinic.$add('doctors', doctorId);

    return { message: 'Doctor assigned successfully' };
  }
}
