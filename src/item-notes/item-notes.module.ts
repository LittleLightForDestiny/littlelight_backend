import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ItemNotes, ItemNotesSchema } from 'src/schemas/item_notes.schema';
import { TagModule } from 'src/tag/tag.module';
import { ItemNotesController } from './item-notes.controller';
import { ItemNotesService } from './item-notes.service';

@Module({
  providers: [ItemNotesService],
  controllers: [ItemNotesController],
  imports: [
    AuthModule,
    TagModule,
    MongooseModule.forFeature([
      { name: ItemNotes.name, schema: ItemNotesSchema },
    ]),
  ],
})
export class ItemNotesModule {}
