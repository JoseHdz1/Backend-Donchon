import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreadDto } from './dto/create-bread.dto';
import { UpdateBreadDto } from './dto/update-bread.dto';
import { Bread } from './entities/bread.entity';
import { BreadsType } from '../breads-types/entities/breads-type.entity';
import { BreadsCategory } from '../breads-category/entities/breads-category.entity';

@Injectable()
export class BreadsService {
  constructor(
    @InjectRepository(Bread)
    private readonly breadRepository: Repository<Bread>,
    @InjectRepository(BreadsType)
    private readonly breadsTypeRepository: Repository<BreadsType>,
    @InjectRepository(BreadsCategory)
    private readonly breadsCategoryRepository: Repository<BreadsCategory>,
  ) {}

  private readonly relations = { breadType: true, category: true };

  private async getRelations(breadTypeId?: number, categoryId?: number) {
    const [breadType, category] = await Promise.all([
      breadTypeId === undefined
        ? Promise.resolve(undefined)
        : this.breadsTypeRepository.findOneBy({ id: breadTypeId }),
      categoryId === undefined
        ? Promise.resolve(undefined)
        : this.breadsCategoryRepository.findOneBy({ id: categoryId }),
    ]);

    if (breadTypeId !== undefined && !breadType) {
      throw new NotFoundException(`Bread type with id ${breadTypeId} not found`);
    }
    if (categoryId !== undefined && !category) {
      throw new NotFoundException(`Bread category with id ${categoryId} not found`);
    }

    return { breadType, category };
  }

  create(createBreadDto: CreateBreadDto) {
    return this.getRelations(
      createBreadDto.breadTypeId,
      createBreadDto.categoryId,
    ).then(({ breadType, category }) => {
      const bread = this.breadRepository.create({
        name: createBreadDto.name,
        shelfLifeDays: createBreadDto.shelfLifeDays ?? null,
        breadType: breadType!,
        category: category!,
      });
      return this.breadRepository.save(bread);
    });
  }

  findAll() {
    return this.breadRepository.find({ relations: this.relations });
  }

  async findOne(id: number) {
    const bread = await this.breadRepository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!bread) {
      throw new NotFoundException(`Bread with id ${id} not found`);
    }
    return bread;
  }

  async update(id: number, updateBreadDto: UpdateBreadDto) {
    const bread = await this.findOne(id);
    const { breadTypeId, categoryId, ...fields } = updateBreadDto;
    const relations = await this.getRelations(breadTypeId, categoryId);
    Object.assign(bread, fields);
    if (relations.breadType) {
      bread.breadType = relations.breadType;
    }
    if (relations.category) {
      bread.category = relations.category;
    }
    return this.breadRepository.save(bread);
  }

  async remove(id: number) {
    const bread = await this.findOne(id);
    await this.breadRepository.softRemove(bread);
    return { id, deleted: true };
  }
}
