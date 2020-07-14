import { Injectable, Inject } from "@nestjs/common";
import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose";
import configuration from "./configuration";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(@Inject(configuration.KEY) private config: ConfigType<typeof configuration>,) {
    }
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.config.mongoDB.connectionURI,
        };
    }
}