import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Tag, TagSchema } from 'src/schemas/tag.schema';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  providers: [TagService],
  controllers: [TagController],
  exports: [TagService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
  ],
})
export class TagModule {}
