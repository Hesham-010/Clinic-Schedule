import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClinicRegisterDto } from './dtos/clinic-register.dto';
import { PatientRegisterDto } from './dtos/patient-register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { ClinicService } from 'src/clinic/services/clinic.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clinicService: ClinicService,
    private jwtService: JwtService,
  ) {}

  async registerAsClinic(clinicRegisterDto: ClinicRegisterDto) {
    const { name, email, lat, lng, password, phone } = clinicRegisterDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const clinic = await this.clinicService.create({
      name,
      email,
      phone,
      lat,
      lng,
      password: hashedPassword,
    });

    const accessToken = this.jwtService.sign({
      userId: clinic.id,
    });

    return { accessToken, clinic };
  }

  registerAsPatient(patientRegisterDto: PatientRegisterDto) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // get clinic by email
    const clinic = await this.clinicService.findByEmail(email);
    if (!clinic) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Password Check
    const isPasswordValid = await bcrypt.compare(password, clinic.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate Access Token
    const payload = { userId: clinic.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      clinic,
    };
  }
}
