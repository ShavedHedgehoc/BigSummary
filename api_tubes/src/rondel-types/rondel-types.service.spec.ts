import { Test, TestingModule } from '@nestjs/testing';
import { RondelTypesService } from './rondel-types.service';

describe('RondelTypesService', () => {
  let service: RondelTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RondelTypesService],
    }).compile();

    service = module.get<RondelTypesService>(RondelTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
