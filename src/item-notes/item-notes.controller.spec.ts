import { Test, TestingModule } from '@nestjs/testing';
import { ItemNotesController } from './item-notes.controller';

describe('ItemNotes Controller', () => {
  let controller: ItemNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemNotesController],
    }).compile();

    controller = module.get<ItemNotesController>(ItemNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
