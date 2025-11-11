import { Test, TestingModule } from '@nestjs/testing';
import { ChiefTechnologistNotesService } from './chief-technologist-notes.service';

describe('ChiefTechnologistNotesService', () => {
  let service: ChiefTechnologistNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChiefTechnologistNotesService],
    }).compile();

    service = module.get<ChiefTechnologistNotesService>(ChiefTechnologistNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
