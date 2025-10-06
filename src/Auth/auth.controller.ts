import { Body, Controller, Post } from '@nestjs/common';
import { ClinicRegisterDto } from './dtos/clinic-register.dto';
import { PatientRegisterDto } from './dtos/patient-register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('clinic/register')
  registerAsClinic(@Body() clinicRegisterDto: ClinicRegisterDto) {
    return this.authService.registerAsClinic(clinicRegisterDto);
  }

  @Post('patient/register')
  registerAsPatient(patientRegisterDto: PatientRegisterDto) {
    return this.authService.registerAsPatient(patientRegisterDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
