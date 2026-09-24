import { PartialType } from '@nestjs/mapped-types';
import { CreateBreadsTypeDto } from './create-breads-type.dto';

export class UpdateBreadsTypeDto extends PartialType(CreateBreadsTypeDto) {}
