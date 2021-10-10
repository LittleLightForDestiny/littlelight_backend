import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from 'src/player/player.module';
import { PlayerAuth, PlayerAuthSchema } from 'src/schemas/player_auth.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    PlayerModule,
    MongooseModule.forFeature([
      { name: PlayerAuth.name, schema: PlayerAuthSchema },
    ]),
  ],
})
export class AuthModule {}
