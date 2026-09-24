import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BreadsCategory } from '../breads-category/entities/breads-category.entity';
import { BreadsType } from '../breads-types/entities/breads-type.entity';
import { BreadsService } from './breads.service';
import { Bread } from './entities/bread.entity';

describe('BreadsService', () => {
  let service: BreadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BreadsService,
        {
          provide: getRepositoryToken(Bread),
          useValue: {},
        },
        {
          provide: getRepositoryToken(BreadsType),
          useValue: {},
        },
        {
          provide: getRepositoryToken(BreadsCategory),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BreadsService>(BreadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
