import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ClinicServices } from 'src/clinic/entities/clinic-services.entity';
import { Clinic } from 'src/clinic/entities/clinic.entity';

@Table({ tableName: 'services' })
export class Service extends Model<Service> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @BelongsToMany(() => Clinic, () => ClinicServices)
  declare clinics: Clinic[];
}
