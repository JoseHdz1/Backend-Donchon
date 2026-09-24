import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DistributorsService } from './distributors.service';
import { Distributor } from './entities/distributor.entity';

describe('DistributorsService', () => {
  let service: DistributorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistributorsService,
        { provide: getRepositoryToken(Distributor), useValue: {} },
      ],
    }).compile();

    service = module.get<DistributorsService>(DistributorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
