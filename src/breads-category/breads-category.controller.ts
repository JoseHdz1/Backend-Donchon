import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreadsCategoryService } from './breads-category.service';
import { CreateBreadsCategoryDto } from './dto/create-breads-category.dto';
import { UpdateBreadsCategoryDto } from './dto/update-breads-category.dto';

@Controller('breads-category')
export class BreadsCategoryController {
  constructor(private readonly breadsCategoryService: BreadsCategoryService) {}

  @Post()
  create(@Body() createBreadsCategoryDto: CreateBreadsCategoryDto) {
    return this.breadsCategoryService.create(createBreadsCategoryDto);
  }

  @Get()
  findAll() {
    return this.breadsCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breadsCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreadsCategoryDto: UpdateBreadsCategoryDto) {
    return this.breadsCategoryService.update(+id, updateBreadsCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breadsCategoryService.remove(+id);
  }
}
