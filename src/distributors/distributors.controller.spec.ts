import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DistributorsController } from './distributors.controller';
import { DistributorsService } from './distributors.service';
import { Distributor } from './entities/distributor.entity';

describe('DistributorsController', () => {
  let controller: DistributorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistributorsController],
      providers: [
        DistributorsService,
        { provide: getRepositoryToken(Distributor), useValue: {} },
      ],
    }).compile();

    controller = module.get<DistributorsController>(DistributorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
