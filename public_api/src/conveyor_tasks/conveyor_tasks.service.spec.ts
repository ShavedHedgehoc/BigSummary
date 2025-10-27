import { Test, TestingModule } from '@nestjs/testing';
import { ConveyorTasksService } from './conveyor_tasks.service';

describe('ConveyorTasksService', () => {
  let service: ConveyorTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConveyorTasksService],
    }).compile();

    service = module.get<ConveyorTasksService>(ConveyorTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
