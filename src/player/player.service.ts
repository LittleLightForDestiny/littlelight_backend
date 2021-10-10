import { Injectable } from '@nestjs/common';
import { Player } from 'src/schemas/player.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayerService {
    constructor(@InjectModel(Player.name) private model: Model<Player>) {
     }

     async findOrCreate(membershipId:string):Promise<Player>{
        let model = await this.model.findOne({membership_id:membershipId});
        if(!model){
            await this.model.create({membership_id:membershipId});
            model = await this.model.findOne({membership_id:membershipId});
        }
        return model;
     }

     async count():Promise<number>{
         return this.model.count({});
     }
}
