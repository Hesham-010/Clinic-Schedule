import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { ClinicModule } from './clinic/clinic.module';
import { ServicesModule } from './services/services.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DoctorModule,
    AuthModule,
    ClinicModule,
    ServicesModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
