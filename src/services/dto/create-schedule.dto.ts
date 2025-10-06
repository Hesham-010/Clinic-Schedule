import { IsEnum, IsNotEmpty, IsNumber, Matches } from 'class-validator';
import { DaysEnum } from 'src/utils/enums/schedule.enum';

export class CreateScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  clinicId: number;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsNotEmpty()
  @IsEnum(DaysEnum)
  day: DaysEnum;

  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'endTime must be in HH:mm or HH:mm:ss format',
  })
  @IsNotEmpty()
  openTime: string;

  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'endTime must be in HH:mm or HH:mm:ss format',
  })
  @IsNotEmpty()
  endTime: string;
}
