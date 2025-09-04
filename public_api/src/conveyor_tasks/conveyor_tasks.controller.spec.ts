import { Test, TestingModule } from '@nestjs/testing';
import { ConveyorTasksController } from './conveyor_tasks.controller';

describe('ConveyorTasksController', () => {
  let controller: ConveyorTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConveyorTasksController],
    }).compile();

    controller = module.get<ConveyorTasksController>(ConveyorTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
