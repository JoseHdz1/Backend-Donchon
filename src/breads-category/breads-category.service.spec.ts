import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BreadsCategoryService } from './breads-category.service';
import { BreadsCategory } from './entities/breads-category.entity';

describe('BreadsCategoryService', () => {
  let service: BreadsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BreadsCategoryService,
        {
          provide: getRepositoryToken(BreadsCategory),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BreadsCategoryService>(BreadsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
