import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignServiceDto {
  @IsNumber()
  @IsNotEmpty()
  serviceId: number;
}
