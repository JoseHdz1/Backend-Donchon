import { Module } from '@nestjs/common';
import { BreadsCategoryService } from './breads-category.service';
import { BreadsCategoryController } from './breads-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreadsCategory } from './entities/breads-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BreadsCategory])],
  controllers: [BreadsCategoryController],
  providers: [BreadsCategoryService],
})
export class BreadsCategoryModule {}
