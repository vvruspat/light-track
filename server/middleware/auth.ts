import { NON_PROTECTED_API } from "@/constants/non-protected-api";
import getLightTrackSession from "@/utils/getLightTrackSession";

export default defineEventHandler(async (event) => {
  if (import.meta.server) {
    const url = getRequestURL(event).pathname;

    if (
      !url.includes("/api") ||
      url.includes("/api/_nuxt") ||
      NON_PROTECTED_API.includes(url)
    ) {
      return;
    }

    try {
      const { chatId, ...user } = await getLightTrackSession(event);

      if (!user) {
        return {
          statusCode: 401,
          statusMessage: "Unauthorized",
          message: "Authentication is required",
        };
      }
      event.context.user = user;
      event.context.chatId = chatId;
    } catch (e) {
      return {
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: (e as Error).message,
      };
    }
  }
});
