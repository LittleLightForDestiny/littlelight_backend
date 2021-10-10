import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDataDto } from 'src/auth/dto/login_data.dto';
import { AuthorizedResponse } from 'src/entities/authorized_response';
import { ItemNotes } from 'src/schemas/item_notes.schema';
import { TagService } from 'src/tag/tag.service';
import { ItemNotesService } from './item-notes.service';
import { ItemNotesResponse } from './responses/item-notes.response';

@Controller('item-notes')
export class ItemNotesController {
  constructor(
    private auth: AuthService,
    private service: ItemNotesService,
    private tagsService: TagService,
  ) {}

  @Post('')
  async list(@Req() req: Request): Promise<ItemNotesResponse | AuthorizedResponse | ApiError> {
    try {
      const auth: LoginDataDto = await this.auth.login(req);
      const notes = await this.service.list(auth.player.membership_id);
      const tags = await this.tagsService.list(auth.player.membership_id);
      return { notes: notes, tags: tags, secret:auth.auth.secret};
    } catch (e) {
      return {
        error: e,
      };
    }
  }

  @Post('save')
  async save(
    @Req() req: Request,
    @Body() body: ItemNotes,
  ): Promise<ItemNotes | ApiError> {
    try {
      const auth: LoginDataDto = await this.auth.login(req);
      const notes = await this.service.save(auth?.player?.membership_id, body);
      return notes;
    } catch (e) {
      console.log(e);
      return {
        error: e,
      };
    }
  }
}
