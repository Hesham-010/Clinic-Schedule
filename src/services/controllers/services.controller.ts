import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { CreateServiceDto } from '../dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
