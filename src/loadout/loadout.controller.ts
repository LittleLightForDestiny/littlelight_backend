import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Loadout } from 'src/schemas/loadout.schema';
import { LoadoutService } from './loadout.service';
import { LoadoutListResponse } from './responses/loadout_list.response';

@Controller('loadout')
export class LoadoutController {
    constructor(
        private auth: AuthService,
        private service: LoadoutService
    ) {

    }

    @Post('')
    async list(@Req() req: Request): Promise<LoadoutListResponse | ApiError> {
        try {
            const auth = await this.auth.login(req);
            const loadouts = await this.service.list(auth.player.membership_id);
            return { data: loadouts };
        } catch (e) {
            return {
                error: e,
            };
        }
    }

    @Post('save')
    async save(@Req() req: Request, @Body() body: Loadout):Promise<Loadout | ApiError> {
        try {
            const auth = await this.auth.login(req);
            const loadout = await this.service.save(auth.player.membership_id, body);
            return loadout;
        } catch (e) {
            console.log(e);
            return {
                error: e,
            };
        }
    }

    @Post('delete')
    async delete(@Req() req: Request, @Body() body: Loadout):Promise<Loadout | ApiError> {
        try {
            const auth = await this.auth.login(req);
            const loadout = await this.service.delete(auth?.player?.membership_id, body.assignedId);
            return loadout;
        } catch (e) {
            return {
                error: e,
            };
        }
    }
}
