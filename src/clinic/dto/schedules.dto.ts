import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsEnum,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DaysEnum } from 'src/utils/enums/schedule.enum';

export class OpeningSchedulesDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(DaysEnum)
  day: string;

  @IsOptional()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'endTime must be in HH:mm or HH:mm:ss format',
  })
  openingTime?: string | null;

  @IsOptional()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'endTime must be in HH:mm or HH:mm:ss format',
  })
  closingTime?: string | null;

  @IsBoolean()
  isClosed: boolean;
}

export class SchedulesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpeningSchedulesDto)
  schedules: OpeningSchedulesDto[];
}
