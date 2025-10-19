import { Test, TestingModule } from '@nestjs/testing';
import { ExtrusionService } from './extrusion.service';

describe('ExtrusionService', () => {
  let service: ExtrusionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtrusionService],
    }).compile();

    service = module.get<ExtrusionService>(ExtrusionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
