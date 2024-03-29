import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AuthorizedResponse } from 'src/entities/authorized_response';
import { Tag } from 'src/schemas/tag.schema';
import { TagListResponse } from './responses/tag_list.response';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private auth: AuthService, private service: TagService) { }

  @Post('')
  async list(@Req() req: Request): Promise<AuthorizedResponse | TagListResponse | ApiError> {
    try {
      const auth = await this.auth.login(req);
      const tags = await this.service.list(auth.player.membership_id);
      return { tags: tags, secret: auth.auth.secret };
    } catch (e) {
      return {
        error: e,
      };
    }
  }

  @Post('save')
  async save(@Req() req: Request, @Body() body: Tag): Promise<Tag | ApiError> {
    try {
      const auth = await this.auth.login(req);
      const tags = await this.service.save(auth?.player?.membership_id, body);
      return tags;
    } catch (e) {
      console.log(e);
      return {
        error: e,
      };
    }
  }

  @Post('delete')
  async delete(
    @Req() req: Request,
    @Body() body: Tag,
  ): Promise<Tag | ApiError> {
    try {
      const auth = await this.auth.login(req);
      const tag = await this.service.delete(auth?.player?.membership_id, body);
      return tag;
    } catch (e) {
      console.log(e);
      return {
        error: e,
      };
    }
  }
}
