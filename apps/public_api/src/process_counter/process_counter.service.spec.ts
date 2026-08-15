import { Test, TestingModule } from '@nestjs/testing';
import { ProcessCounterService } from './process_counter.service';

describe('ProcessCounterService', () => {
  let service: ProcessCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessCounterService],
    }).compile();

    service = module.get<ProcessCounterService>(ProcessCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
