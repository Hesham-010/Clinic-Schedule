import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { CreateClinicDto } from '../dto/create-clinic.dto';
import { UpdateClinicDto } from '../dto/update-clinic.dto';
import { ClinicService } from '../services/clinic.service';
import { AssignDoctorDto } from '../dto/asign-doctor.dto';
import { AssignServiceDto } from '../dto/asign-service.dto';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicService.update(+id, updateClinicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicService.remove(+id);
  }

  /* Routs assign and get clinic doctors */
  @Get(':id/doctors')
  async getClinicDoctors(@Param('id') clinicId: number) {
    return this.clinicService.doctors(clinicId);
  }

  @Post(':id/assign-doctor')
  assignDoctor(@Param('id') clinicId: number, @Body() dto: AssignDoctorDto) {
    return this.clinicService.assignDoctor(clinicId, dto.doctorId);
  }

  /* Assign and get clinic services */
  @Get(':id/services')
  async getClinicServices(@Param('id') clinicId: number) {
    return this.clinicService.services(clinicId);
  }

  @Post(':id/assign-service')
  assignService(@Param('id') clinicId: number, @Body() dto: AssignServiceDto) {
    return this.clinicService.assignService(clinicId, dto.serviceId);
  }
}
