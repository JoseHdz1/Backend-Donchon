import { Module } from '@nestjs/common';
import { BreadsTypesService } from './breads-types.service';
import { BreadsTypesController } from './breads-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreadsType } from './entities/breads-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BreadsType])],
  controllers: [BreadsTypesController],
  providers: [BreadsTypesService],
})
export class BreadsTypesModule {}
