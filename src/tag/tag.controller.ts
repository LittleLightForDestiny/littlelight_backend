import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { TagService } from './tag.service';
import { LoginDataDto } from 'src/auth/dto/login_data.dto';
import { Request } from 'express';
import { Tag } from 'src/schemas/tag.schema';

@Controller('tag')
export class TagController {
    constructor(
        private auth: AuthService,
        private service: TagService
    ) {
    }

    @Post('')
    async list(@Req() req: Request) {
        try {
            let auth: LoginDataDto;
            auth = await this.auth.login(req);
            let tags = await this.service.list(auth.player.id);
            return { tags: tags };
        } catch (e) {
            return {
                error: e,
            };
        }
    }

    @Post('save')
    async save(@Req() req: Request, @Body() body: Tag) {
        try {
            let auth: LoginDataDto;
            auth = await this.auth.login(req);
            let tags = await this.service.save(auth?.player?.id, body);
            return tags;
        } catch (e) {
            console.log(e);
            return {
                error: e,
            };
        }
    }

    @Post('delete')
    async delete(@Req() req: Request, @Body() body: Tag) {
        try {
            let auth: LoginDataDto;
            auth = await this.auth.login(req);
            let tag = await this.service.delete(auth?.player?.id, body);
            return tag;
        } catch (e) {
            console.log(e);
            return {
                error: e,
            };
        }
    }


}
