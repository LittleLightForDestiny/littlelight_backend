import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps:{createdAt:"created_at", updatedAt:"updated_at"}})
export class ItemNotes extends Document {
  @Prop({index:true})
  player_id: string;

  @Prop({index:true})
  membership_id: string;
  
  @Prop()
  itemInstanceId: string;
  
  @Prop()
  itemHash: number;
  
  @Prop()
  customName: string;
  
  @Prop()
  notes: string;

  @Prop()
  tags:string[];
}

export const ItemNotesSchema = SchemaFactory.createForClass(ItemNotes);