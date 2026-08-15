import { Test, TestingModule } from '@nestjs/testing';
import { ProcessCounterController } from './process_counter.controller';

describe('ProcessCounterController', () => {
  let controller: ProcessCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessCounterController],
    }).compile();

    controller = module.get<ProcessCounterController>(ProcessCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
