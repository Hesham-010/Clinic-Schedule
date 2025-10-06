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
import { Service } from './service.entity';

@Table({
  tableName: 'service_schedules',
})
export class ServiceSchedules extends Model<ServiceSchedules> {
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
