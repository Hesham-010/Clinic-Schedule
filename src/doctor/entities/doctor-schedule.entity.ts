import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { DaysEnum } from 'src/utils/enums/schedule.enum';
import { Doctor } from './doctor.entity';
import { Service } from 'src/services/entities/service.entity';

@Table({
  tableName: 'doctor_schedules',
  indexes: [
    {
      unique: true,
      fields: ['doctorId', 'clinicId', 'day'],
    },
  ],
})
export class DoctorSchedules extends Model<DoctorSchedules> {
  @ForeignKey(() => Clinic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare clinicId: number;

  @BelongsTo(() => Clinic)
  declare clinic: Clinic;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare serviceId: number;

  @BelongsTo(() => Service)
  declare service: Service;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctorId: number;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;

  @Column({
    type: DataType.ENUM(...Object.values(DaysEnum)),
    allowNull: false,
  })
  declare day: DaysEnum;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  declare openTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  declare endTime: string;
}
