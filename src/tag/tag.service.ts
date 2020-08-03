import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from 'src/schemas/tag.schema';

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag.name) private model: Model<Tag>) {
    }

    async list(player_id: string): Promise<Tag[]> {
        let tags = await this.model.find({ player_id: player_id });
        return tags;
    }

    async save(player_id: string, tag: Tag): Promise<Tag> {
        let existing = await this.model.findOne({ player_id: player_id, tagId:tag.tagId });
        let predicate = { ...tag, player_id: player_id, tagId:tag.tagId};
        if (existing) {
            await existing.updateOne(predicate);
            return tag;
        }
        let newTag = await this.model.create(predicate);
        return newTag;
    }

    async delete(player_id: string, tag: Tag): Promise<Tag> {
        let existing = await this.model.findOne({ player_id: player_id, tagId:tag.tagId });
        if (existing) {
            await existing.deleteOne();
        }
        return existing;
    }
}
