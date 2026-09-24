import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreadsTypeDto } from './dto/create-breads-type.dto';
import { UpdateBreadsTypeDto } from './dto/update-breads-type.dto';
import { BreadsType } from './entities/breads-type.entity';

@Injectable()
export class BreadsTypesService {
  constructor(
    @InjectRepository(BreadsType)
    private readonly breadsTypeRepository: Repository<BreadsType>,
  ) {}

  create(createBreadsTypeDto: CreateBreadsTypeDto) {
    const breadsType = this.breadsTypeRepository.create(createBreadsTypeDto);
    return this.breadsTypeRepository.save(breadsType);
  }

  findAll() {
    return this.breadsTypeRepository.find();
  }

  async findOne(id: number) {
    const breadsType = await this.breadsTypeRepository.findOneBy({ id });
    if (!breadsType) {
      throw new NotFoundException(`Bread type with id ${id} not found`);
    }
    return breadsType;
  }

  async update(id: number, updateBreadsTypeDto: UpdateBreadsTypeDto) {
    const breadsType = await this.findOne(id);
    Object.assign(breadsType, updateBreadsTypeDto);
    return this.breadsTypeRepository.save(breadsType);
  }

  async remove(id: number) {
    const breadsType = await this.findOne(id);
    await this.breadsTypeRepository.softRemove(breadsType);
    return { id, deleted: true };
  }
}
