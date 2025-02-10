import { validate3rd } from "@telegram-apps/init-data-node";
import type { LoginPostRequest, LoginPostResponse } from "@/types/api";

export default defineEventHandler(async (event): Promise<LoginPostResponse> => {
  const body = await readBody<LoginPostRequest>(event);
  const { botId } = useRuntimeConfig();

  try {
    const data = {
      ...body,
      user: JSON.stringify(body.user),
    };

    validate3rd(new URLSearchParams(data).toString(), Number(botId));
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: (e as Error).message,
    });
  }

  return {
    statusCode: 200,
    statusMessage: "Logined",
  };
});
