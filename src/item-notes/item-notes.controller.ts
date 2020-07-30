import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDataDto } from 'src/auth/dto/login_data.dto';
import { ItemNotes } from 'src/schemas/item_notes.schema';
import { ItemNotesService } from './item-notes.service';

@Controller('item-notes')
export class ItemNotesController {
    constructor(
        private auth: AuthService,
        private service: ItemNotesService
    ) {

    }

    @Post('')
    async list(@Req() req: Request) {
        try {
            let auth: LoginDataDto;
            auth = await this.auth.login(req);
            let notes = await this.service.list(auth.player.id);
            return { notes: notes };
        } catch (e) {
            return {
                error: e,
            };
        }
    }

    @Post('save')
    async save(@Req() req: Request, @Body() body: ItemNotes) {
        try {
            let auth: LoginDataDto;
            auth = await this.auth.login(req);
            let notes = await this.service.save(auth?.player?.id, body);
            return notes;
        } catch (e) {
            console.log(e);
            return {
                error: e,
            };
        }
    }
}
