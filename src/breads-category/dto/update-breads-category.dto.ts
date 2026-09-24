import { PartialType } from '@nestjs/mapped-types';
import { CreateBreadsCategoryDto } from './create-breads-category.dto';

export class UpdateBreadsCategoryDto extends PartialType(CreateBreadsCategoryDto) {}
