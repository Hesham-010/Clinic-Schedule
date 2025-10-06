import { Module } from '@nestjs/common';
import { DoctorController } from './controllers/doctor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './entities/doctor.entity';
import { DoctorSchedules } from './entities/doctor-schedule.entity';
import { DoctorService } from './services/doctor.service';
import { DoctorScheduleController } from './controllers/doctor-schedule.controller';
import { DoctorScheduleService } from './services/doctore-schedule.service';
import { ClinicSchedules } from 'src/clinic/entities/clinic-schedule.entity';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { ServiceSchedules } from 'src/services/entities/service-schedule.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Doctor,
      DoctorSchedules,
      ClinicSchedules,
      Clinic,
      ServiceSchedules,
    ]),
  ],
  controllers: [DoctorController, DoctorScheduleController],
  providers: [DoctorService, DoctorScheduleService],
})
export class DoctorModule {}
