import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Clinic } from '../entities/clinic.entity';
import { CreateClinicDto } from '../dto/create-clinic.dto';
import { UpdateClinicDto } from '../dto/update-clinic.dto';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { ClinicSchedules } from '../entities/clinic-schedule.entity';
import { Service } from 'src/services/entities/service.entity';

@Injectable()
export class ClinicService {
  constructor(
    @InjectModel(Clinic) private readonly clinicModel: typeof Clinic,
    @InjectModel(Doctor) private doctorModel: typeof Doctor,
    @InjectModel(Service) private serviceModel: typeof Service,
  ) {}

  async create(createClinicDto: CreateClinicDto) {
    const clinic = await this.clinicModel.create(createClinicDto as Clinic);
    return clinic;
  }

  async findById(id: number): Promise<Clinic> {
    const clinic = await this.clinicModel.findByPk(id, {
      include: [ClinicSchedules],
    });
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }
    return clinic;
  }

  async update(id: number, updateData: UpdateClinicDto): Promise<Clinic> {
    const clinic = await this.findById(id);

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    await clinic.update(updateData);
    return clinic;
  }

  async remove(id: number) {
    const deletedCount = await this.clinicModel.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      throw new NotFoundException('Clinic not found');
    }

    return 'Success';
  }

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

    await clinic.$add('doctors', doctorId);

    return { message: 'Doctor assigned successfully' };
  }

  async services(clinicId: number) {
    const clinic = await this.clinicModel.findByPk(clinicId, {
      include: [Service],
    });
    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }

    return clinic.services;
  }

  async assignService(clinicId: number, serviceId: number) {
    const clinic = await this.clinicModel.findByPk(clinicId);
    if (!clinic) throw new NotFoundException('Clinic not found');

    const service = await this.serviceModel.findByPk(serviceId);
    if (!service) throw new NotFoundException('Service not found');

    await clinic.$add('services', serviceId);

    return { message: 'Service assigned successfully' };
  }

  async findByEmail(email: string) {
    return this.clinicModel.findOne({ where: { email } });
  }
}
