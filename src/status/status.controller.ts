import { Controller, Get } from '@nestjs/common';
import { PlayerService } from 'src/player/player.service';

@Controller('status')
export class StatusController {
    constructor(private playerService: PlayerService){
    }
    @Get()
    async statusGet(){
        try{
            let playerCount = await this.playerService.count();
            if(playerCount > 0){
                return {status:"OK",playerCount:playerCount};
            }
        }catch(e){
            console.log(e);
        }
        return {status:"error", playerCount:0};
    }
}
