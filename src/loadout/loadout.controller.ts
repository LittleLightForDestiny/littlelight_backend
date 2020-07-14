import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDataDto } from 'src/auth/dto/login_data.dto';
import { LoadoutService } from './loadout.service';
import { Loadout } from 'src/schemas/loadout.schema';

@Controller('loadout')
export class LoadoutController {
    constructor(
        private auth: AuthService,
        private service: LoadoutService
    ) {

    }

    @Post('')
    async list(@Req() req: Request) {
        try {
            let auth: LoginDataDto;
            auth = await this.auth.login(req);
            let loadouts = await this.service.list(auth.player.id);
            return {data:loadouts};
        } catch (e) {
            return {
                error: e,
            };
        }
    }

    @Post('save')
    async save(@Req() req: Request, @Body() body: Loadout) {
        try {
            let auth: LoginDataDto;
            auth = await this.auth.login(req);
            let loadout = await this.service.save(auth?.player?.id, body);
            return loadout;
        } catch (e) {
            console.log(e);
            return {
                error: e,
            };
        }
    }

    @Post('delete')
    async delete(@Req() req: Request, @Body() body: Loadout) {
        try {
            let auth: LoginDataDto;
            auth = await this.auth.login(req);
            let loadout = await this.service.delete(auth?.player?.id, body.assignedId);
            return loadout;
        } catch (e) {
            return {
                error: e,
            };
        }
    }
}
