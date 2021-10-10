import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps:{createdAt:"created_at", updatedAt:"updated_at"}})
export class Player extends Document {
  @Prop({
    index:true
  })
  membership_id: string;

  @Prop({readonly:true})
  master_user?:boolean;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);