import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsCategotyDto } from './create-products-categoty.dto';

export class UpdateProductsCategotyDto extends PartialType(CreateProductsCategotyDto) {}
