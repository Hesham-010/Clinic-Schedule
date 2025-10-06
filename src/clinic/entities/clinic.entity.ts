import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { ClinicDoctor } from 'src/clinic/entities/clinic-doctor.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { ClinicSchedules } from './clinic-schedule.entity';
import { Service } from 'src/services/entities/service.entity';
import { ClinicServices } from './clinic-services.entity';

@Table({
  tableName: 'clinics',
})
export class Clinic extends Model<Clinic> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare lat: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare lng: string;

  /*--------------Relations---------------*/
  @BelongsToMany(() => Service, () => ClinicServices)
  declare services: Service[];

  @BelongsToMany(() => Doctor, () => ClinicDoctor)
  declare doctors: Doctor[];

  @HasMany(() => ClinicSchedules)
  declare schedules: ClinicSchedules[];
}
