import { Markup, Telegraf } from "telegraf";

export default function initTelegramBot(botToken: string, webAppUrl: string) {
  if (!botToken) {
    throw new Error("botToken must be provided!");
  }

  const bot = new Telegraf(botToken);

  bot.command("start", async (ctx) => {
    const chatId = ctx.chat.id;
    const authData = {
      chatId,
    };
    const encodedData = Buffer.from(JSON.stringify(authData)).toString(
      "base64",
    );

    return await ctx.reply(
      "Light Track - simple task tracking app",
      Markup.inlineKeyboard([
        [
          {
            text: "Launch",
            url: `${webAppUrl}?token=${encodedData}`,
          },
        ],
      ]),
    );
  });

  console.log("Bot is initialized...");
  bot
    .launch()
    .then(() => {
      console.log("Bot is running...");
    })
    .catch((err) => {
      console.error("Bot failed to start", err);
    });

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
