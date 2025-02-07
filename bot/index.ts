import { Markup, Telegraf } from "telegraf";
import { BOT_TOKEN, WEBAPP_URL } from "./config";

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(BOT_TOKEN);

bot.command("start", async (ctx) => {
  const chatId = ctx.chat.id;
  const userData = ctx.from;
  const authData = {
    chatId,
    ...userData,
  };
  const encodedData = Buffer.from(JSON.stringify(authData)).toString("base64");

  return await ctx.reply(
    "Lighgt Track - simple task tracking app",
    Markup.inlineKeyboard([
      [{ text: "Launch", url: `${WEBAPP_URL}?token=${encodedData}` }],
    ]),
  );
});

bot.launch().then(() => {
  console.log("Bot is running...");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
