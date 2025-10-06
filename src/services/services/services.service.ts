import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from '../entities/service.entity';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service) private serviceModel: typeof Service) {}

  async create(createServiceDto: CreateServiceDto) {
    // Check By Name
    const ser = await this.serviceModel.findOne({
      where: { name: createServiceDto.name },
    });
    if (ser) {
      throw new BadRequestException('Service already exists');
    }

    // Create Service
    const newService = await this.serviceModel.create(createServiceDto as any);

    return newService;
  }

  async findAll() {
    const services = await this.serviceModel.findAll();
    return services;
  }

  // Get Service By id
  async findOne(id: number) {
    const service = await this.serviceModel.findByPk(id);

    if (!service) {
      throw new NotFoundException(`Service not found`);
    }
    return `This action returns a #${id} service`;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    // Get Service By id
    const service = await this.serviceModel.findByPk(id);

    if (!service) {
      throw new NotFoundException(`Service not found`);
    }

    //Update Service
    await service.update(updateServiceDto);
    return `Service updated successfully`;
  }

  async remove(id: number) {
    // Get Service By id
    const service = await this.serviceModel.findByPk(id);

    if (!service) {
      throw new NotFoundException(`Service not found`);
    }

    // Destroy Service
    await service.destroy();
    return `Service deleted successfully`;
  }
}
