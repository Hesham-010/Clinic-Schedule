import { IsNumber, IsOptional } from 'class-validator';

export class FilterDto {
  @IsNumber()
  @IsOptional()
  name?: number;

  @IsNumber()
  @IsOptional()
  clinicId?: number;
}
