import { PlayerAuth } from 'src/schemas/player_auth.schema';
import { Player } from 'src/schemas/player.schema';

export interface LoginDataDto {
  auth: PlayerAuth;
  player: Player;
}
