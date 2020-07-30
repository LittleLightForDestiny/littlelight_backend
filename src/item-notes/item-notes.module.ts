import { Module } from '@nestjs/common';
import { ItemNotesService } from './item-notes.service';
import { ItemNotesController } from './item-notes.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemNotes, ItemNotesSchema } from 'src/schemas/item_notes.schema';

@Module({
  providers: [ItemNotesService],
  controllers: [ItemNotesController],
  imports:[
    AuthModule,
    MongooseModule.forFeature([
    {name:ItemNotes.name, schema:ItemNotesSchema}
  ])],
  
})
export class ItemNotesModule {}
