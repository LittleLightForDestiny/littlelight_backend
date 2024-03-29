import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoadoutModule } from './loadout/loadout.module';
import configuration from './configuration';
import { MongooseConfigService } from './mongoose_config';
import { StatusModule } from './status/status.module';
import { ItemNotesModule } from './item-notes/item-notes.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PlayerModule,
    AuthModule,
    LoadoutModule,
    StatusModule,
    ItemNotesModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
