import { Test, TestingModule } from '@nestjs/testing';
import { BreadsTypesController } from './breads-types.controller';
import { BreadsTypesService } from './breads-types.service';

describe('BreadsTypesController', () => {
  let controller: BreadsTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreadsTypesController],
      providers: [
        {
          provide: BreadsTypesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BreadsTypesController>(BreadsTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
