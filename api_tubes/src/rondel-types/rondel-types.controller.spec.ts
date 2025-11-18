import { Test, TestingModule } from '@nestjs/testing';
import { RondelTypesController } from './rondel-types.controller';

describe('RondelTypesController', () => {
  let controller: RondelTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RondelTypesController],
    }).compile();

    controller = module.get<RondelTypesController>(RondelTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
