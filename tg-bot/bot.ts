import initTelegramBot from "./index";

import { config } from 'dotenv';

config();

const { NUXT_BOT_TOKEN: botToken, NUXT_WEBAPP_URL: webappUrl } = process.env;

if (!botToken || !webappUrl) {
  throw new Error("Missing environment variables: botToken or webappUrl");
}

initTelegramBot(botToken, webappUrl);