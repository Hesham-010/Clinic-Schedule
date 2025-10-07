import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class ClinicRegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsLatitude()
  lat: string;

  @IsString()
  @IsNotEmpty()
  @IsLongitude()
  lng: string;
}
