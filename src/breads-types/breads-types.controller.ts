import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreadsTypesService } from './breads-types.service';
import { CreateBreadsTypeDto } from './dto/create-breads-type.dto';
import { UpdateBreadsTypeDto } from './dto/update-breads-type.dto';

@Controller('breads-types')
export class BreadsTypesController {
  constructor(private readonly breadsTypesService: BreadsTypesService) {}

  @Post()
  create(@Body() createBreadsTypeDto: CreateBreadsTypeDto) {
    return this.breadsTypesService.create(createBreadsTypeDto);
  }

  @Get()
  findAll() {
    return this.breadsTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breadsTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreadsTypeDto: UpdateBreadsTypeDto) {
    return this.breadsTypesService.update(+id, updateBreadsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breadsTypesService.remove(+id);
  }
}
