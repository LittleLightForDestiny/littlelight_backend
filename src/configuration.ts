import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
    BungieAPI:{
        rootURL:process.env.BUNGIE_ROOT_URL || "https://www.bungie.net",
        apiKey:process.env.BUNGIE_API_KEY,
        clientId:process.env.BUNGIE_CLIENT_ID,
        clientSecret:process.env.BUNGIE_CLIENT_SECRET
      }
  }));