import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsCategotyService } from './products-categoty.service';
import { ProductCategory } from './entities/products-categoty.entity';

describe('ProductsCategotyService', () => {
  let service: ProductsCategotyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsCategotyService,
        { provide: getRepositoryToken(ProductCategory), useValue: {} },
      ],
    }).compile();

    service = module.get<ProductsCategotyService>(ProductsCategotyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
