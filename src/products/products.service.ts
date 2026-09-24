import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Distributor } from '../distributors/entities/distributor.entity';
import { ProductCategory } from '../products-categoty/entities/products-categoty.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Distributor)
    private readonly distributorRepository: Repository<Distributor>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
  ) {}

  private readonly relations = { category: true, distributor: true };

  private async getRelations(categoryId?: number, distributorId?: number) {
    const [category, distributor] = await Promise.all([
      categoryId === undefined
        ? Promise.resolve(undefined)
        : this.categoryRepository.findOneBy({ id: categoryId }),
      distributorId === undefined
        ? Promise.resolve(undefined)
        : this.distributorRepository.findOneBy({ id: distributorId }),
    ]);

    if (categoryId !== undefined && !category) {
      throw new NotFoundException(`Product category with id ${categoryId} not found`);
    }
    if (distributorId !== undefined && !distributor) {
      throw new NotFoundException(`Distributor with id ${distributorId} not found`);
    }
    return { category, distributor };
  }

  create(createProductDto: CreateProductDto) {
    const { categoryId, distributorId, ...fields } = createProductDto;
    return this.getRelations(
      categoryId,
      distributorId,
    ).then(({ category, distributor }) =>
      this.productRepository.save(
        this.productRepository.create({
          ...fields,
          category: category!,
          distributor: distributor!,
        }),
      ),
    );
  }

  findAll() {
    return this.productRepository.find({ relations: this.relations });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    const { categoryId, distributorId, ...fields } = updateProductDto;
    const relations = await this.getRelations(categoryId, distributorId);
    Object.assign(product, fields);
    if (relations.category) product.category = relations.category;
    if (relations.distributor) product.distributor = relations.distributor;
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.softRemove(product);
    return { id, deleted: true };
  }
}
