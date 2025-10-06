import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { ClinicDoctor } from 'src/clinic/entities/clinic-doctor.entity';
import { ClinicSchedules } from 'src/clinic/entities/clinic-schedule.entity';
import { Service } from 'src/services/entities/service.entity';
import { ClinicServices } from 'src/clinic/entities/clinic-services.entity';
import { ServiceSchedules } from 'src/services/entities/service-schedule.entity';
import { DoctorSchedules } from 'src/doctor/entities/doctor-schedule.entity';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        models: [
          Clinic,
          Doctor,
          ClinicDoctor,
          ClinicSchedules,
          Service,
          ClinicServices,
          ServiceSchedules,
          DoctorSchedules,
        ],
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
