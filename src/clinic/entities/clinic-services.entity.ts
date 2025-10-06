import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { Service } from 'src/services/entities/service.entity';

@Table({
  tableName: 'clinic_services',
})
export class ClinicServices extends Model<ClinicServices> {
  @ForeignKey(() => Clinic)
  @Column
  clinicId: number;

  @ForeignKey(() => Service)
  @Column
  serviceId: number;
}
