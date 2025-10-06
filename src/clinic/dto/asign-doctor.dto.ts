import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignDoctorDto {
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;
}
