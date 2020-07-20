import { Controller, Get, Query, Post, Body, Header, Headers, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBodyDto } from './dto/login_request_body.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService
    ) {
    }

    // @Get()
    // async loginGet(@Query("code") code: string) {
    //     let languageCode = 'en';
    //     if (code) {
    //         let res = await this.service.loginViaCode(code);
    //         return res;
    //     }
    //     return {
    //         link: this.service.getOAuthURL()
    //     };
    // }

    // @Post()
    // async loginPost(@Req() req:Request) {
    //     try {
    //         var tokenResponse = await this.service.login(req);
    //         return { secret: tokenResponse.auth.secret };
    //     } catch (e) {
    //         return {
    //             error: e,
    //             link: this.service.getOAuthURL()
    //         };
    //     }
    // }
}
