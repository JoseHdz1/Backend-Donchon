import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreadsCategoryDto } from './dto/create-breads-category.dto';
import { UpdateBreadsCategoryDto } from './dto/update-breads-category.dto';
import { BreadsCategory } from './entities/breads-category.entity';

@Injectable()
export class BreadsCategoryService {
  constructor(
    @InjectRepository(BreadsCategory)
    private readonly breadsCategoryRepository: Repository<BreadsCategory>,
  ) {}

  create(createBreadsCategoryDto: CreateBreadsCategoryDto) {
    const breadsCategory = this.breadsCategoryRepository.create(
      createBreadsCategoryDto,
    );
    return this.breadsCategoryRepository.save(breadsCategory);
  }

  findAll() {
    return this.breadsCategoryRepository.find();
  }

  async findOne(id: number) {
    const breadsCategory = await this.breadsCategoryRepository.findOneBy({ id });
    if (!breadsCategory) {
      throw new NotFoundException(`Bread category with id ${id} not found`);
    }
    return breadsCategory;
  }

  async update(id: number, updateBreadsCategoryDto: UpdateBreadsCategoryDto) {
    const breadsCategory = await this.findOne(id);
    Object.assign(breadsCategory, updateBreadsCategoryDto);
    return this.breadsCategoryRepository.save(breadsCategory);
  }

  async remove(id: number) {
    const breadsCategory = await this.findOne(id);
    await this.breadsCategoryRepository.softRemove(breadsCategory);
    return { id, deleted: true };
  }
}
