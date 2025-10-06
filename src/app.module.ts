import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { ClinicModule } from './clinic/clinic.module';
import { ServicesModule } from './services/services.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
