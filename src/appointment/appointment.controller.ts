import { Body, Controller, Get } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { SlotDto } from './dto/slot.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('slots')
  async getSlots(@Body() dto: SlotDto) {
    return this.appointmentService.getSlots(dto);
  }
}
