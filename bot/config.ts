import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(import.meta.dirname, "../.env") });

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const WEBAPP_URL = process.env.WEBAPP_URL;
