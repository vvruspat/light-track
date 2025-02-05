import { Telegraf } from "telegraf";
import { BOT_TOKEN, WEBAPP_URL } from "./config";

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(BOT_TOKEN);

bot.command("help", (ctx) => {
  ctx.reply(
    "Available commands:\n" +
      "/start - Open Light Track App\n"
  );
});

bot.command("start", (ctx) => {
  const chatId = ctx.chat.id;
  // Encode le chatId en base64
  const encodedGroupId = Buffer.from(chatId.toString()).toString("base64");

  ctx.reply("Light Track - simple task tracking app", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Launch", url: `${WEBAPP_URL}?startapp=${encodedGroupId}` }],
      ],
    },
  });
});

bot.launch().then(() => {
  console.log("Bot is running...");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
