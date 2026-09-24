import { Test, TestingModule } from '@nestjs/testing';
import { BreadsCategoryController } from './breads-category.controller';
import { BreadsCategoryService } from './breads-category.service';

describe('BreadsCategoryController', () => {
  let controller: BreadsCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreadsCategoryController],
      providers: [
        {
          provide: BreadsCategoryService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BreadsCategoryController>(BreadsCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
