import {
  IsString,
  IsNotEmpty,
  IsLongitude,
  IsLatitude,
  Min,
  IsEmail,
} from 'class-validator';

export class CreateClinicDto {
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
  @Min(6)
  @Min(16)
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
