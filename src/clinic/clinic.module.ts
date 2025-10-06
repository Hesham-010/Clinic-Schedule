import { Module } from '@nestjs/common';
import { ClinicController } from './controllers/clinic.controller';
import { Clinic } from './entities/clinic.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClinicService } from './services/clinic.service';
import { ClinicScheduleController } from './controllers/clinic-schedule.controller';
import { ClinicScheduleService } from './services/clinic-schedule.service';
import { ClinicSchedules } from './entities/clinic-schedule.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { ClinicServices } from './entities/clinic-services.entity';
import { Service } from 'src/services/entities/service.entity';
import { ClinicDoctorController } from './controllers/clinic-doctor.controller';
import { ClinicServiceController } from './controllers/clinic-service.controller';
import { ClinicDoctorService } from './services/clinic-doctor.service';
import { ClinicServiceService } from './services/clinic-service.service';
import { ClinicDoctor } from './entities/clinic-doctor.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Clinic,
      ClinicSchedules,
      Doctor,
      ClinicServices,
      Service,
      ClinicDoctor,
    ]),
  ],
  controllers: [
    ClinicController,
    ClinicScheduleController,
    ClinicDoctorController,
    ClinicServiceController,
  ],
  providers: [
    ClinicService,
    ClinicScheduleService,
    ClinicDoctorService,
    ClinicServiceService,
  ],
  exports: [ClinicService],
})
export class ClinicModule {}
