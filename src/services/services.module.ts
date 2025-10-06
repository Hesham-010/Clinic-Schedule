import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './entities/service.entity';
import { ServicesController } from './controllers/services.controller';
import { ServicesService } from './services/services.service';
import { ServiceSchedules } from './entities/service-schedule.entity';
import { ClinicSchedules } from 'src/clinic/entities/clinic-schedule.entity';
import { ServiceScheduleController } from './controllers/service-schedule.controller';
import { ServiceScheduleService } from './services/service-schedule.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Service, ServiceSchedules, ClinicSchedules]),
  ],
  controllers: [ServicesController, ServiceScheduleController],
  providers: [ServicesService, ServiceScheduleService],
})
export class ServicesModule {}
