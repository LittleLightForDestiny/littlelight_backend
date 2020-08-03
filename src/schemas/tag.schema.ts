import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps:{createdAt:"created_at", updatedAt:"updated_at"}})
export class Tag extends Document {
  @Prop({index:true})
  player_id: string;
  
  @Prop()
  custom:boolean;
  
  @Prop()
  tagId:string;

  @Prop()
  name:string;

  @Prop()
  backgroundColorHex:string;

  @Prop()
  foregroundColorHex:string;

  @Prop()
  icon:string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);