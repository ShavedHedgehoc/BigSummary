import { Test, TestingModule } from '@nestjs/testing';
import { SummaryRawMaterialsService } from './summary-raw-materials.service';

describe('SummaryRawMaterialsService', () => {
  let service: SummaryRawMaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummaryRawMaterialsService],
    }).compile();

    service = module.get<SummaryRawMaterialsService>(SummaryRawMaterialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
