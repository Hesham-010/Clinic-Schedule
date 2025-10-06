import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ClinicDoctor } from 'src/clinic/entities/clinic-doctor.entity';
import { Clinic } from 'src/clinic/entities/clinic.entity';

@Table({
  tableName: 'doctors',
})
export class Doctor extends Model<Doctor> {
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

  /*--------------Relations---------------*/
  @BelongsToMany(() => Clinic, () => ClinicDoctor)
  clinics: Clinic[];
}
