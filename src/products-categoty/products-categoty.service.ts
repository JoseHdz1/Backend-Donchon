import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductsCategotyDto } from './dto/create-products-categoty.dto';
import { UpdateProductsCategotyDto } from './dto/update-products-categoty.dto';
import { ProductCategory } from './entities/products-categoty.entity';

@Injectable()
export class ProductsCategotyService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
  ) {}

  create(createProductsCategotyDto: CreateProductsCategotyDto) {
    return this.categoryRepository.save(
      this.categoryRepository.create(createProductsCategotyDto),
    );
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Product category with id ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateProductsCategotyDto: UpdateProductsCategotyDto) {
    const category = await this.findOne(id);
    Object.assign(category, updateProductsCategotyDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoryRepository.softRemove(category);
    return { id, deleted: true };
  }
}
