import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ collection: "player_auth", timestamps:{createdAt:"created_at", updatedAt:"updated_at"}})
export class PlayerAuth extends Document {
  @Prop()
  uuid: string;

  @Prop()
  secret: string;

  @Prop({
    alias: "playerId",
    type: SchemaTypes.String
  })
  player_id: string;
}

export const PlayerAuthSchema = SchemaFactory.createForClass(PlayerAuth);