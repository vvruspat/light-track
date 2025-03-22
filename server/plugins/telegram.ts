import initTelegramBot from "../../bot/index";

export default defineNitroPlugin(() => {
  console.log("Telegram plugin is running...");
  const { botToken, webappUrl } = useRuntimeConfig();
  initTelegramBot(botToken, webappUrl);
});
