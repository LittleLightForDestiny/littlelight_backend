import { Inject, Injectable, Req } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Axios, { AxiosRequestConfig } from 'axios';
import { UserMembershipData, ServerResponse } from 'bungie-api-ts/user';
import configuration from 'src/configuration';
import { BungieTokenDto } from './dto/bungie_token.dto';
import { Player } from 'src/schemas/player.schema';
import { PlayerService } from 'src/player/player.service';
import { v4 } from "uuid";
import { PlayerAuth } from 'src/schemas/player_auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginResponseBodyDto } from './dto/login_response_body.dto';
import { LoginRequestBodyDto } from './dto/login_request_body.dto';
import { LoginDataDto } from './dto/login_data.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(@Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
        @InjectModel(PlayerAuth.name) private authModel: Model<PlayerAuth>,
        private playerService: PlayerService) {
    }

    getOAuthURL(): string {
        let languageCode = "en";
        return `${this.config.BungieAPI.rootURL}/${languageCode}/OAuth/Authorize?client_id=${this.config.BungieAPI.clientId}&response_type=code`;
    }

    async login(@Req() req:Request):Promise<LoginDataDto>{
        let credentials:LoginRequestBodyDto = req.body;
        let bungieToken:string = req.header('authorization');
        let error:string;
        if(credentials?.secret){
            try{
                let credentialsResponse = await this.loginViaSecret(credentials);
                return credentialsResponse;
            }catch(e){
                error = e;
            }
        }
        if(bungieToken){
            try{
                var tokenResponse = await this.loginViaToken(bungieToken, credentials);
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
        let auth = await this.findAuth(credentials.uuid, credentials.secret);
        let player = await this.playerService.find(auth.player_id);
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
        let membership = memberships?.Response?.destinyMemberships?.filter((m) => m.membershipId == credentials.membership_id)[0];
        if (!membership) throw "Invalid credentials";
        let player = await this.playerService.findOrCreate(membership.membershipId);
        let auth = await this.createAuth(credentials.uuid, player);
        return { player, auth };
    }

    private async findAuth(uuid: string, secret: string): Promise<PlayerAuth> {
        return this.authModel.findOne({
            uuid: uuid,
            secret: secret,
        });
    }

    private async createAuth(uuid: string, player: Player): Promise<PlayerAuth> {
        let secret = v4();
        return this.authModel.create({
            uuid: uuid,
            secret: secret,
            player_id: player.id
        });
    }

    private async getTokenViaCode(code: string): Promise<BungieTokenDto> {
        let url = `${this.config.BungieAPI.rootURL}/Platform/App/OAuth/token/`;
        let body = `client_id=${this.config.BungieAPI.clientId}&client_secret=${this.config.BungieAPI.clientSecret}&code=${code}&grant_type=authorization_code`;
        try {
            let res = await Axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return res.data;
        } catch (e) {
            return e.data;
        }
    }

    async loginViaCode(code: string) {
        let auth = await this.getTokenViaCode(code);
        if (!auth.access_token) {
            return auth;
        }

        let memberships = await this.getMembershipDataForCurrentUser(auth.access_token);
        return {
            access_token: auth.access_token,
            refresh_token: auth.refresh_token,
            memberships: memberships.Response.destinyMemberships
        };
    }

    private async getMembershipDataForCurrentUser(token: string): Promise<ServerResponse<UserMembershipData>> {
        let config: AxiosRequestConfig = {
            url: "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
            headers: {
                'X-API-Key': this.config.BungieAPI.apiKey,
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        let res = await Axios.request(config);
        return res.data;
    }

}