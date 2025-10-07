import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { DaysEnum } from 'src/utils/enums/schedule.enum';

@Table({ tableName: 'appointments' })
export class Appointment extends Model<Appointment> {
  @ForeignKey(() => Clinic)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare clinicId: number;

  @ForeignKey(() => Service)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare serviceId: number;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare doctorId: number | null;

  @Column({
    type: DataType.ENUM(...Object.values(DaysEnum)),
    allowNull: false,
  })
  declare day: DaysEnum;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  declare startTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  declare endTime: string;
}
