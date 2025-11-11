import { Test, TestingModule } from '@nestjs/testing';
import { ChiefTechnologistNotesController } from './chief-technologist-notes.controller';

describe('ChiefTechnologistNotesController', () => {
  let controller: ChiefTechnologistNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChiefTechnologistNotesController],
    }).compile();

    controller = module.get<ChiefTechnologistNotesController>(ChiefTechnologistNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
