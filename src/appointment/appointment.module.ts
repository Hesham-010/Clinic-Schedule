import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './entities/appointment.entity';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { ClinicSchedules } from 'src/clinic/entities/clinic-schedule.entity';
import { Service } from 'src/services/entities/service.entity';
import { ServiceSchedules } from 'src/services/entities/service-schedule.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { DoctorSchedules } from 'src/doctor/entities/doctor-schedule.entity';
import { ClinicDoctor } from 'src/clinic/entities/clinic-doctor.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Appointment,
      Clinic,
      ClinicSchedules,
      Service,
      ServiceSchedules,
      Doctor,
      DoctorSchedules,
      ClinicDoctor,
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
