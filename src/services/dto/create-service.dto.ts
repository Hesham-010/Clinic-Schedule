import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  slotMinutes: number;

  @IsNotEmpty()
  @IsBoolean()
  requiresDoctor: boolean;

  @IsNotEmpty()
  @IsBoolean()
  parallel: boolean;
}
