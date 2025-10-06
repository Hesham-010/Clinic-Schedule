import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Clinic } from './clinic.entity';
import { DaysEnum } from 'src/utils/enums/schedule.enum';

@Table({
  tableName: 'clinic_schedules',
})
export class ClinicSchedules extends Model<ClinicSchedules> {
  @ForeignKey(() => Clinic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare clinicId: number;

  @BelongsTo(() => Clinic)
  declare clinic: Clinic;

  @Column({
    type: DataType.ENUM(...Object.values(DaysEnum)),
    allowNull: false,
  })
  declare day: DaysEnum;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  declare openingTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  declare closingTime: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isClosed: boolean;
}
