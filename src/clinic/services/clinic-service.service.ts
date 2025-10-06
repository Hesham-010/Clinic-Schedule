import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Clinic } from '../entities/clinic.entity';
import { Service } from 'src/services/entities/service.entity';
import { ClinicServices } from '../entities/clinic-services.entity';

@Injectable()
export class ClinicServiceService {
  constructor(
    @InjectModel(Clinic) private readonly clinicModel: typeof Clinic,
    @InjectModel(Service) private serviceModel: typeof Service,
    @InjectModel(ClinicServices)
    private clinicServicesModel: typeof ClinicServices,
  ) {}

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

    const clinicService = await this.clinicServicesModel.findOne({
      where: { clinicId, serviceId },
    });
    if (!clinicService)
      throw new NotFoundException(
        'This Service Already assigned to this clinic',
      );

    await clinic.$add('services', serviceId);

    return { message: 'Service assigned successfully' };
  }

  async findByEmail(email: string) {
    return this.clinicModel.findOne({ where: { email } });
  }
}
