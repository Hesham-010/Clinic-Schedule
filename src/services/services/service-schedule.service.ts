import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { ClinicSchedules } from 'src/clinic/entities/clinic-schedule.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from '../entities/service.entity';
import { ServiceSchedules } from '../entities/service-schedule.entity';
import { Op } from 'sequelize';
import { parseTime } from 'src/utils/enums/parse-time';
import { Clinic } from 'src/clinic/entities/clinic.entity';

@Injectable()
export class ServiceScheduleService {
  constructor(
    @InjectModel(ClinicSchedules)
    private clinicScheduleModel: typeof ClinicSchedules,
    @InjectModel(Service) private serviceModel: typeof Service,
    @InjectModel(ServiceSchedules)
    private serviceSchedulesModel: typeof ServiceSchedules,
  ) {}

  async addServiceSchedule(createScheduleDto: CreateScheduleDto) {
    const { clinicId, serviceId, day, openTime, endTime } = createScheduleDto;

    // Check if service schedule exist
    const existServiceSchedule = await this.serviceSchedulesModel.findOne({
      where: {
        clinicId,
        serviceId,
        day,
        [Op.and]: [
          { openTime: { [Op.lt]: endTime } },
          { endTime: { [Op.gt]: openTime } },
        ],
      },
    });

    if (existServiceSchedule)
      throw new BadRequestException('Service Schedule is exist');

    // Check if clinic exist in this day
    const clinicSchedule = await this.clinicScheduleModel.findOne({
      where: { clinicId, day },
    });
    if (!clinicSchedule || clinicSchedule.isClosed)
      throw new NotFoundException('Clinic Not Found in this day');

    // Check if service exist
    const service = await this.serviceModel.findByPk(serviceId);
    if (!service) throw new NotFoundException('Service Not Found');

    // Verify that appointments are allowed in the clinic
    if (
      parseTime(openTime) < parseTime(clinicSchedule.openingTime) ||
      parseTime(endTime) > parseTime(clinicSchedule.closingTime)
    ) {
      throw new BadRequestException('This schedule is not allowed in clinic');
    }

    // Create schedule
    await this.serviceSchedulesModel.create({
      clinicId,
      serviceId,
      day,
      openTime,
      endTime,
    } as any);

    return 'Service schedule added successfully.';
  }

  async schedules(serviceId: number) {
    const schedules = await this.serviceSchedulesModel.findAll({
      where: { serviceId },
      include: { model: Clinic, attributes: ['name'] },
    });
    return schedules;
  }
}
