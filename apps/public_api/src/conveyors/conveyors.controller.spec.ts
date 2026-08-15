import { Test, TestingModule } from '@nestjs/testing';
import { ConveyorsController } from './conveyors.controller';

describe('ConveyorsController', () => {
  let controller: ConveyorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConveyorsController],
    }).compile();

    controller = module.get<ConveyorsController>(ConveyorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
