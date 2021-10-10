import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface LoadoutItem{
    itemInstanceId:string;
    itemHash:number;
}

@Schema({timestamps:{createdAt:"created_at", updatedAt:"updated_at"}})
export class Loadout extends Document {
  @Prop({index:true})
  player_id: string;

  @Prop({index:true})
  membership_id: string;
  
  @Prop()
  assignedId: string;
  
  @Prop()
  name: string;
  
  @Prop()
  emblemHash: number;

  @Prop()
  equipped:LoadoutItem[];
  
  @Prop()
  unequipped:LoadoutItem[];
}

export const LoadoutSchema = SchemaFactory.createForClass(Loadout);