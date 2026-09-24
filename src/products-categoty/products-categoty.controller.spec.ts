import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsCategotyController } from './products-categoty.controller';
import { ProductsCategotyService } from './products-categoty.service';
import { ProductCategory } from './entities/products-categoty.entity';

describe('ProductsCategotyController', () => {
  let controller: ProductsCategotyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsCategotyController],
      providers: [
        ProductsCategotyService,
        { provide: getRepositoryToken(ProductCategory), useValue: {} },
      ],
    }).compile();

    controller = module.get<ProductsCategotyController>(ProductsCategotyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
