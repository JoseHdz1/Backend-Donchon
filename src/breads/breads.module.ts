import { Module } from '@nestjs/common';
import { BreadsService } from './breads.service';
import { BreadsController } from './breads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bread } from './entities/bread.entity';
import { BreadsType } from '../breads-types/entities/breads-type.entity';
import { BreadsCategory } from '../breads-category/entities/breads-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bread, BreadsType, BreadsCategory])],
  controllers: [BreadsController],
  providers: [BreadsService],
})
export class BreadsModule {}
