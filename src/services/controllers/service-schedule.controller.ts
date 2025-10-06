import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { ServiceScheduleService } from '../services/service-schedule.service';

@Controller('service-schedule')
export class ServiceScheduleController {
  constructor(private serviceSchedule: ServiceScheduleService) {}

  @Post('add')
  addServiceSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.serviceSchedule.addServiceSchedule(createScheduleDto);
  }

  @Get(':serviceId')
  schedules(@Param('serviceId') serviceId: string) {
    return this.serviceSchedule.schedules(+serviceId);
  }
}
