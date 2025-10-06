import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AssignDoctorDto } from '../dto/asign-doctor.dto';
import { ClinicDoctorService } from '../services/clinic-doctor.service';

@Controller('clinic')
export class ClinicDoctorController {
  constructor(private readonly clinicDoctorService: ClinicDoctorService) {}

  /* Routs assign and get clinic doctors */
  @Get(':id/doctors')
  async getClinicDoctors(@Param('id') clinicId: number) {
    return this.clinicDoctorService.doctors(clinicId);
  }

  @Post(':id/assign-doctor')
  assignDoctor(@Param('id') clinicId: number, @Body() dto: AssignDoctorDto) {
    return this.clinicDoctorService.assignDoctor(clinicId, dto.doctorId);
  }
}
