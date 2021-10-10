import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: "player_auth", timestamps:{createdAt:"created_at", updatedAt:"updated_at"}})
export class PlayerAuth extends Document {
  @Prop({index:true})
  membership_id: string;
  
  @Prop()
  uuid: string;

  @Prop()
  secret: string;

  @Prop()
  player_id?: string;
}

export const PlayerAuthSchema = SchemaFactory.createForClass(PlayerAuth);