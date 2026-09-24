import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsCategotyService } from './products-categoty.service';
import { CreateProductsCategotyDto } from './dto/create-products-categoty.dto';
import { UpdateProductsCategotyDto } from './dto/update-products-categoty.dto';

@Controller('products-categoty')
export class ProductsCategotyController {
  constructor(private readonly productsCategotyService: ProductsCategotyService) {}

  @Post()
  create(@Body() createProductsCategotyDto: CreateProductsCategotyDto) {
    return this.productsCategotyService.create(createProductsCategotyDto);
  }

  @Get()
  findAll() {
    return this.productsCategotyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsCategotyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsCategotyDto: UpdateProductsCategotyDto) {
    return this.productsCategotyService.update(+id, updateProductsCategotyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsCategotyService.remove(+id);
  }
}
