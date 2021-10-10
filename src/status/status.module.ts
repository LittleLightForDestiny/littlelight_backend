import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { PlayerModule } from 'src/player/player.module';

@Module({
  controllers: [StatusController],
  imports: [PlayerModule],
})
export class StatusModule {}
