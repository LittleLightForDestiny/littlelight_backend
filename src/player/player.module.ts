import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from 'src/schemas/player.schema';
import { PlayerService } from './player.service';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Player.name, schema:PlayerSchema}
  ])],
  providers: [PlayerService],
  exports:[PlayerService]
})
export class PlayerModule {}
