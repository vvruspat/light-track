import type { LoginPostRequest, LoginPostResponse } from "@/types/api";
import type { Database } from "@/types/database.types";
import createJWT from "@/utils/createJWT";
import { validate3rd } from "@telegram-apps/init-data-node";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event): Promise<LoginPostResponse> => {
  const { params: data } = await readBody<LoginPostRequest>(event);
  const {
    public: { botId },
  } = useRuntimeConfig();
  const client = await serverSupabaseClient<Database>(event);

  const searchParams = new URLSearchParams(data);

  const chatId = Number(searchParams.get("chat_instance"));
  const chatType = searchParams.get("chat_type");
  let user = JSON.parse(searchParams.get("user") ?? "{}");

  try {
    await validate3rd(data, Number(botId));
  } catch (e) {
    const error = e as Error;

    let errorMessage = "Failed to login";

    switch (error.message) {
      case "ERR_AUTH_DATE_INVALID":
        errorMessage = "Authentication date is invalid or missing.";
        break;
      case "ERR_SIGNATURE_MISSING":
        errorMessage = "Signature is missing or empty.";
        break;
      case "ERR_SIGN_INVALID":
        errorMessage = "Signature is invalid.";
        break;
      case "ERR_EXPIRED":
        errorMessage = "The initialization data has expired.";
        break;
      default:
        errorMessage = `An unknown error occurred:${error.message}`;
    }

    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: errorMessage,
    });
  }

  try {
    // add or update chat
    const newChatId: Database["public"]["Tables"]["chats"]["Insert"] = {
      chat_instance: chatId,
      chat_type: chatType ?? "private",
    };

    await client.from("chats").upsert([newChatId]);

    if (user.id) {
      // add or update user

      const newUser: Database["public"]["Tables"]["users"]["Insert"] = {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        language_code: user.language_code,
        photo_url: user.photo_url,
        allows_write_to_pm: user.allows_write_to_pm,
      };

      const upsertUser = await client
        .from("users")
        .upsert([newUser])
        .select()
        .single();

      if (upsertUser.error) {
        throw new Error(upsertUser.error.message);
      }

      user = upsertUser.data;

      // add user to chat_user
      const chatUser: Database["public"]["Tables"]["chat_users"]["Insert"] = {
        chat_id: chatId,
        user_id: user.id,
      };

      const upsertChatUser = await client.from("chat_users").upsert([chatUser]);

      if (upsertChatUser.error) {
        throw new Error(upsertChatUser.error.message);
      }
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "User ID is required",
      });
    }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to login",
      message: (e as Error).message,
    });
  }

  try {
    if (user && chatId) {
      const token = await createJWT(user, chatId);

      setCookie(event, "jwt", token, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
      });

      return {
        statusCode: 200,
        statusMessage: "Logined",
        data: {
          token,
          user,
          chat_id: chatId,
        },
      };
    }
    return {
      statusCode: 404,
      statusMessage: "Failed to login",
      message: "User not found",
    };
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to login",
      message: (e as Error).message,
    });
  }
});
