import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from 'src/schemas/tag.schema';

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag.name) private model: Model<Tag>) {
    }

    async list(membership_id: string): Promise<Tag[]> {
        const tags = await this.model.find({ membership_id: membership_id });
        return tags;
    }

    async save(membership_id: string, tag: Tag): Promise<Tag> {
        const existing = await this.model.findOne({ membership_id: membership_id, tagId:tag.tagId });
        const predicate = { ...tag, membership_id: membership_id, tagId:tag.tagId};
        if (existing) {
            await existing.updateOne(predicate);
            return tag;
        }
        const newTag = await this.model.create(predicate);
        return newTag;
    }

    async delete(membership_id: string, tag: Tag): Promise<Tag> {
        const existing = await this.model.findOne({ membership_id: membership_id, tagId:tag.tagId });
        if (existing) {
            await existing.deleteOne();
        }
        return existing;
    }
}
