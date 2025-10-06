import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DoctorScheduleService } from '../services/doctore-schedule.service';
import { CreateDoctorScheduleDto } from '../dto/create-schedule.dto';

@Controller('doctor-schedule')
export class DoctorScheduleController {
  constructor(private doctorSchedule: DoctorScheduleService) {}

  @Post('add')
  addDoctorSchedule(@Body() createScheduleDto: CreateDoctorScheduleDto) {
    return this.doctorSchedule.addDoctorSchedule(createScheduleDto);
  }

  @Get(':doctorId')
  schedules(@Param('doctorId') doctorId: string) {
    return this.doctorSchedule.schedules(+doctorId);
  }
}
