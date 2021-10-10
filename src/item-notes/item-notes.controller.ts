import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDataDto } from 'src/auth/dto/login_data.dto';
import { ItemNotes } from 'src/schemas/item_notes.schema';
import { ItemNotesService } from './item-notes.service';
import { TagService } from 'src/tag/tag.service';
import { Tag } from 'src/schemas/tag.schema';
import { ItemNotesResponse } from './responses/item-notes.response';

@Controller('item-notes')
export class ItemNotesController {
    constructor(
        private auth: AuthService,
        private service: ItemNotesService,
        private tagsService: TagService
    ) {

    }

    @Post('')
    async list(@Req() req: Request): Promise<ItemNotesResponse | ApiError> {
        try {
            const auth: LoginDataDto = await this.auth.login(req);
            const notes = await this.service.list(auth.player.id);
            const tags = await this.tagsService.list(auth.player.id);
            return { notes: notes, tags: tags };
        } catch (e) {
            return {
                error: e,
            };
        }
    }

    @Post('save')
    async save(@Req() req: Request, @Body() body: ItemNotes): Promise<ItemNotes | ApiError> {
        try {
            const auth: LoginDataDto = await this.auth.login(req);
            const notes = await this.service.save(auth?.player?.id, body);
            return notes;
        } catch (e) {
            console.log(e);
            return {
                error: e,
            };
        }
    }
}
