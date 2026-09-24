import { Module } from '@nestjs/common';
import { ProductsCategotyService } from './products-categoty.service';
import { ProductsCategotyController } from './products-categoty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/products-categoty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [ProductsCategotyController],
  providers: [ProductsCategotyService],
})
export class ProductsCategotyModule {}
