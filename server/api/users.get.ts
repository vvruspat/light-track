import { defineEventHandler, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { UsersGetResponse } from "@/types/api";
import getLightTrackSession from "~/utils/getLightTrackSession";

export default defineEventHandler(async (event): Promise<UsersGetResponse> => {
  const client = await serverSupabaseClient<Database>(event);

  const { chatId } = await getLightTrackSession(event);

  const { data, error } = await client
    .from("chat_users")
    .select(
      `
      *,
      users (
        *
      )
    `,
    )
    .eq("chat_id", chatId);

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  const users = data?.map((chatUser) => chatUser.users);

  return {
    statusCode: 200,
    statusMessage: "Success",
    data: users ?? [],
  };
});
