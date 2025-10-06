import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AssignServiceDto } from '../dto/asign-service.dto';
import { ClinicServiceService } from '../services/clinic-service.service';

@Controller('clinic')
export class ClinicServiceController {
  constructor(private readonly clinicServiceService: ClinicServiceService) {}

  /* Assign and get clinic services */
  @Get(':id/services')
  async getClinicServices(@Param('id') clinicId: number) {
    return this.clinicServiceService.services(clinicId);
  }

  @Post(':id/assign-service')
  assignService(@Param('id') clinicId: number, @Body() dto: AssignServiceDto) {
    return this.clinicServiceService.assignService(clinicId, dto.serviceId);
  }
}
