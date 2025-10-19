import { Test, TestingModule } from '@nestjs/testing';
import { ExtrusionController } from './extrusion.controller';
import { ExtrusionService } from './extrusion.service';

describe('ExtrusionController', () => {
  let controller: ExtrusionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtrusionController],
      providers: [ExtrusionService],
    }).compile();

    controller = module.get<ExtrusionController>(ExtrusionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
