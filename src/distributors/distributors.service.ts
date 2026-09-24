import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateDistributorDto } from './dto/create-distributor.dto';
import { UpdateDistributorDto } from './dto/update-distributor.dto';
import { Distributor } from './entities/distributor.entity';

@Injectable()
export class DistributorsService {
  constructor(
    @InjectRepository(Distributor)
    private readonly distributorRepository: Repository<Distributor>,
  ) {}

  create(createDistributorDto: CreateDistributorDto) {
    return this.distributorRepository.save(
      this.distributorRepository.create(createDistributorDto),
    );
  }

  findAll() {
    return this.distributorRepository.find();
  }

  async findOne(id: number) {
    const distributor = await this.distributorRepository.findOneBy({ id });
    if (!distributor) {
      throw new NotFoundException(`Distributor with id ${id} not found`);
    }
    return distributor;
  }

  async update(id: number, updateDistributorDto: UpdateDistributorDto) {
    const distributor = await this.findOne(id);
    Object.assign(distributor, updateDistributorDto);
    return this.distributorRepository.save(distributor);
  }

  async remove(id: number) {
    const distributor = await this.findOne(id);
    await this.distributorRepository.softRemove(distributor);
    return { id, deleted: true };
  }
}
