import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClinicSchedules } from '../entities/clinic-schedule.entity';
import { SchedulesDto } from '../dto/schedules.dto';
import { Sequelize } from 'sequelize-typescript';
import { ClinicService } from './clinic.service';

@Injectable()
export class ClinicScheduleService {
  constructor(
    @InjectModel(ClinicSchedules)
    private readonly ClinicSchedulesModel: typeof ClinicSchedules,
    private readonly sequelize: Sequelize,
    private readonly clinicService: ClinicService,
  ) {}

  async setClinicSchedules(clinicId: number, schedulesDto: SchedulesDto) {
    await this.clinicService.findById(clinicId);
    return this.sequelize.transaction(async (t) => {
      // Remove schedules
      await this.ClinicSchedulesModel.destroy({
        where: { clinicId },
        transaction: t,
      });

      // Add schedules
      const created = await this.ClinicSchedulesModel.bulkCreate(
        schedulesDto.schedules.map(
          (schedule) =>
            ({
              ...schedule,
              clinicId,
            }) as any,
        ),
        { transaction: t },
      );

      return created;
    });
  }

  // Get All Schedules For Clinic
  async getClinicSchedules(clinicId: number) {
    return await this.ClinicSchedulesModel.findAll({ where: { clinicId } });
  }
}
