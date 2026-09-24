import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Distributor } from '../distributors/entities/distributor.entity';
import { ProductCategory } from '../products-categoty/entities/products-categoty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Distributor, ProductCategory])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
