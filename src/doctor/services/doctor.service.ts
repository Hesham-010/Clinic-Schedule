import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { Op } from 'sequelize';
import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { FilterDto } from '../dto/filter.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorModel.create(createDoctorDto as Doctor);
    return doctor;
  }

  async findAll(filter: FilterDto) {
    const { name, clinicId } = filter;

    const where: any = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    const include: any = [
      {
        model: Clinic,
        through: { attributes: [] },
      },
    ];

    if (clinicId) {
      include[0].where = { id: clinicId };
    }

    const doctors = await this.doctorModel.findAll({
      where,
      include,
    });
    return doctors;
  }

  async findOne(id: number) {
    const doctor = await this.doctorModel.findByPk(id);
    if (!doctor) {
      throw new NotFoundException('Doctor Not Found');
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const [affectedRows] = await this.doctorModel.update(updateDoctorDto, {
      where: { id },
    });

    if (affectedRows === 0) {
      throw new NotFoundException('Doctor Not Found');
    }

    return 'Success';
  }

  async remove(id: number) {
    const deletedCount = await this.doctorModel.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      throw new NotFoundException('Doctor not found');
    }

    return 'Success';
  }
}
