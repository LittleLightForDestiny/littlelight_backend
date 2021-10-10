import { Controller, Get } from '@nestjs/common';
import { PlayerService } from 'src/player/player.service';

@Controller('status')
export class StatusController {
  constructor(private playerService: PlayerService) {}
  @Get()
  async statusGet(): Promise<{ status: string; playerCount: number }> {
    try {
      const playerCount = await this.playerService.count();
      if (playerCount > 0) {
        return { status: 'OK', playerCount: playerCount };
      }
    } catch (e) {
      console.log(e);
    }
    return { status: 'error', playerCount: 0 };
  }
}
