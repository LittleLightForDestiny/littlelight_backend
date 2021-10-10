import { Injectable } from '@nestjs/common';
import { ItemNotes } from 'src/schemas/item_notes.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemNotesService {
  constructor(@InjectModel(ItemNotes.name) private model: Model<ItemNotes>) {}

  async list(membership_id: string): Promise<ItemNotes[]> {
    const notes = await this.model.find({ membership_id: membership_id });
    return notes;
  }

  async save(membership_id: string, notes: ItemNotes): Promise<ItemNotes> {
    const existing = await this.model.findOne({
      itemInstanceId: notes.itemInstanceId,
      itemHash: notes.itemHash,
      membership_id: membership_id,
    });
    const predicate = {
      ...notes,
      itemInstanceId: notes.itemInstanceId,
      itemHash: notes.itemHash,
      membership_id: membership_id,
    };
    if (existing) {
      await existing.updateOne(predicate);
      return notes;
    }
    const newNotes = await this.model.create(predicate);
    return newNotes;
  }
}
