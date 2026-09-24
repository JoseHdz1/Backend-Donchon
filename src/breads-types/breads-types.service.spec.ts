import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BreadsTypesService } from './breads-types.service';
import { BreadsType } from './entities/breads-type.entity';

describe('BreadsTypesService', () => {
  let service: BreadsTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BreadsTypesService,
        {
          provide: getRepositoryToken(BreadsType),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BreadsTypesService>(BreadsTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
