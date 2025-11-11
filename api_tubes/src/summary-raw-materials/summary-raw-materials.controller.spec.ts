import { Test, TestingModule } from '@nestjs/testing';
import { SummaryRawMaterialsController } from './summary-raw-materials.controller';

describe('SummaryRawMaterialsController', () => {
  let controller: SummaryRawMaterialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummaryRawMaterialsController],
    }).compile();

    controller = module.get<SummaryRawMaterialsController>(SummaryRawMaterialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
