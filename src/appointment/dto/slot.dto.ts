import { IsNotEmpty, IsNumber } from 'class-validator';

export class SlotDto {
  @IsNumber()
  @IsNotEmpty()
  clinicId: number;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsNotEmpty()
  date: string;
}
