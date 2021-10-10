import { Inject, Injectable, Req } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import Axios, { AxiosRequestConfig } from 'axios';
import { ServerResponse, UserMembershipData } from 'bungie-api-ts/user';
import { Request } from 'express';
import { Model } from 'mongoose';
import configuration from 'src/configuration';
import { PlayerService } from 'src/player/player.service';
import { Player } from 'src/schemas/player.schema';
import { PlayerAuth } from 'src/schemas/player_auth.schema';
import { v4 } from "uuid";
import { BungieTokenDto } from './dto/bungie_token.dto';
import { LoginDataDto } from './dto/login_data.dto';
import { LoginRequestBodyDto } from './dto/login_request_body.dto';

@Injectable()
export class AuthService {
    constructor(@Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
        @InjectModel(PlayerAuth.name) private authModel: Model<PlayerAuth>,
        private playerService: PlayerService) {
    }

    getOAuthURL(): string {
        const languageCode = "en";
        return `${this.config.BungieAPI.rootURL}/${languageCode}/OAuth/Authorize?client_id=${this.config.BungieAPI.clientId}&response_type=code`;
    }

    async login(@Req() req:Request):Promise<LoginDataDto>{
        const credentials:LoginRequestBodyDto = req.body;
        const bungieToken:string = req.header('authorization');
        let error:string;
        if(credentials?.secret){
            try{
                const credentialsResponse = await this.loginViaSecret(credentials);
                return credentialsResponse;
            }catch(e){
                error = e;
            }
        }
        if(bungieToken){
            try{
                const tokenResponse = await this.loginViaToken(bungieToken, credentials);
                return tokenResponse;
            }catch(e){
                error = e;
            }
        }
        if(error){
            throw error;
        }
        throw "invalid credentials";
    }

    async loginViaSecret(credentials:LoginRequestBodyDto): Promise<LoginDataDto> {
        const auth = await this.findAuth(credentials.uuid, credentials.secret);
        const player = await this.playerService.findOrCreate(auth.membership_id);
        if(!auth || !player) throw "invalid credentials";
        return { player, auth };
    }

    async loginViaToken(token: string, credentials:LoginRequestBodyDto): Promise<LoginDataDto> {
        let memberships:ServerResponse<UserMembershipData>;
        try{
            memberships = await this.getMembershipDataForCurrentUser(token);
        }catch(e){
            console.log(e);
        }
        const membership = memberships?.Response?.destinyMemberships?.filter((m) => m.membershipId == credentials.membership_id)[0];
        if (!membership) throw "Invalid credentials";
        const player = await this.playerService.findOrCreate(membership.membershipId);
        const auth = await this.createAuth(credentials.uuid, player);
        return { player, auth };
    }

    private async findAuth(uuid: string, secret: string): Promise<PlayerAuth> {
        return this.authModel.findOne({
            uuid: uuid,
            secret: secret,
        });
    }

    private async createAuth(uuid: string, player: Player): Promise<PlayerAuth> {
        const secret = v4();
        return this.authModel.create({
            uuid: uuid,
            secret: secret,
            membership_id: player.membership_id
        });
    }

    private async getMembershipDataForCurrentUser(token: string): Promise<ServerResponse<UserMembershipData>> {
        const config: AxiosRequestConfig = {
            url: "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
            headers: {
                'X-API-Key': this.config.BungieAPI.apiKey,
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const res = await Axios.request(config);
        return res.data;
    }

}