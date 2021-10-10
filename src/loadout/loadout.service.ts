import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Loadout } from 'src/schemas/loadout.schema';
import { Model } from 'mongoose';

@Injectable()
export class LoadoutService {
    constructor(@InjectModel(Loadout.name) private model: Model<Loadout>) {
    }

    async list(membership_id: string): Promise<Loadout[]> {
        const loadouts = await this.model.find({ membership_id: membership_id });
        return loadouts;
    }

    async delete(membership_id: string, assignedId: string): Promise<Loadout> {
        const loadout = await this.model.findOne({assignedId:assignedId});
        if (loadout?.membership_id != membership_id) {
            throw "loadout_not_found";
        }
        await loadout.deleteOne();
        return loadout;
    }

    async save(membership_id: string, loadout: Loadout): Promise<Loadout> {
        const assignedId: string = loadout.assignedId;
        if ((assignedId?.length ?? 0) == 0) {
            throw "no_assigned_id";
        }
        const existing = await this.model.findOne({ assignedId: assignedId, membership_id: membership_id });
        const predicate = { ...loadout, membership_id: membership_id, assignedId: assignedId };
        if (existing) {
            await existing.updateOne(predicate);
            return loadout;
        }
        const newLoadout = await this.model.create(predicate);
        return newLoadout;
    }
}
