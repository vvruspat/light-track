import useLightTrackSession from "@/utils/useLightTrackSession";
import { NON_PROTECTED_API } from "@/constants/non-protected-api";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname;

  if (
    !url.includes("/api") ||
    url.includes("/api/_nuxt") ||
    NON_PROTECTED_API.includes(url)
  ) {
    console.log("Non-protected API");
    return;
  }

  const { chatId, ...user } = useLightTrackSession(event);

  if (!user) {
    return {
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Authentication is required",
    };
  } else {
    event.context.user = user;
    event.context.chatId = chatId;
  }
});
