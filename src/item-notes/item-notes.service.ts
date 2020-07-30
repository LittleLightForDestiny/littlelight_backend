import { Injectable } from '@nestjs/common';
import { ItemNotes } from 'src/schemas/item_notes.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemNotesService {
    constructor(@InjectModel(ItemNotes.name) private model: Model<ItemNotes>) {
    }

    async list(player_id: string): Promise<ItemNotes[]> {
        let notes = await this.model.find({ player_id: player_id });
        return notes;
    }

    async save(player_id: string, notes: ItemNotes): Promise<ItemNotes> {
        let existing = await this.model.findOne({ itemInstanceId: notes.itemInstanceId, itemHash: notes.itemHash, player_id: player_id });
        let predicate = { ...notes, itemInstanceId: notes.itemInstanceId, itemHash: notes.itemHash, player_id: player_id };
        if (existing) {
            await existing.updateOne(predicate);
            return notes;
        }
        let newNotes = await this.model.create(predicate);
        return newNotes;
    }
}
