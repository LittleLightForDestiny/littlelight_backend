import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Loadout } from 'src/schemas/loadout.schema';
import { Model } from 'mongoose';

@Injectable()
export class LoadoutService {
    constructor(@InjectModel(Loadout.name) private model: Model<Loadout>) {
    }

    async list(player_id: string): Promise<Loadout[]> {
        let loadouts = await this.model.find({ player_id: player_id });
        return loadouts;
    }

    async delete(player_id: string, assignedId: string): Promise<Loadout> {
        let loadout = await this.model.findOne({assignedId:assignedId});
        if (loadout?.player_id != player_id) {
            throw "loadout_not_found";
        }
        await loadout.deleteOne();
        return loadout;
    }

    async save(player_id: string, loadout: Loadout): Promise<Loadout> {
        let assignedId: string = loadout.assignedId;
        if ((assignedId?.length ?? 0) == 0) {
            throw "no_assigned_id";
        }
        let existing = await this.model.findOne({ assignedId: assignedId, player_id: player_id });
        let predicate = { ...loadout, player_id: player_id, assignedId: assignedId };
        if (existing) {
            await existing.updateOne(predicate);
            return loadout;
        }
        let newLoadout = await this.model.create(predicate);
        return newLoadout;
    }
}
