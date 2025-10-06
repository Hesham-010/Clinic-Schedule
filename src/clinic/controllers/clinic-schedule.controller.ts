import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ClinicScheduleService } from '../services/clinic-schedule.service';
import { SchedulesDto } from '../dto/schedules.dto';

@Controller('clinic-schedule')
export class ClinicScheduleController {
  constructor(private readonly clinicScheduleService: ClinicScheduleService) {}

  @Post(':clinicId')
  setClinicSchedules(
    @Param('clinicId') clinicId: number,
    @Body() schedules: SchedulesDto,
  ) {
    return this.clinicScheduleService.setClinicSchedules(clinicId, schedules);
  }

  @Get(':id')
  getClinicSchedules(@Param('id') id: string) {
    return this.clinicScheduleService.getClinicSchedules(+id);
  }
}
