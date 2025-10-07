import { Body, Controller, Get } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AvailabilityDto } from './dto/availability.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('slots')
  async getSlots(@Body() dto: AvailabilityDto) {
    return this.appointmentService.getSlots(dto);
  }
}
