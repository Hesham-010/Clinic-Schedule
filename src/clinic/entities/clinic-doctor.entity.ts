import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Table({
  tableName: 'clinic_doctors',
})
export class ClinicDoctor extends Model<ClinicDoctor> {
  @ForeignKey(() => Clinic)
  @Column
  declare clinicId: number;

  @ForeignKey(() => Doctor)
  @Column
  declare doctorId: number;
}
