import initTelegramBot from "../../tg-bot";

export default defineNitroPlugin(() => {
  console.log("Telegram plugin is running...");
  if (process.env.NITRO_PRESET === "server") {
    const { botToken, webappUrl } = useRuntimeConfig();
    initTelegramBot(botToken, webappUrl);
  } else {
    console.log("Telegram bot skip in build");
  }
});
