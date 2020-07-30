import { Test, TestingModule } from '@nestjs/testing';
import { ItemNotesService } from './item-notes.service';

describe('ItemNotesService', () => {
  let service: ItemNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemNotesService],
    }).compile();

    service = module.get<ItemNotesService>(ItemNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
