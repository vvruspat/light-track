import { defineEventHandler, getRouterParam, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { StoryDeleteResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<StoryDeleteResponse> => {
    const id = Number(getRouterParam(event, "id"));

    const client = await serverSupabaseClient<Database>(event);
    const { user } = event.context;

    // Ensure the user is authenticated
    if (!user?.id) {
      return {
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "You need to be logged in to remove an story",
      };
    }

    if (!id || Number.isNaN(id)) {
      return {
        statusCode: 404,
        statusMessage: "Bad Request",
        message: "Story not found",
      };
    }

    const { error } = await client.from("stories").delete().eq("id", id);

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the created story
    return {
      statusCode: 200,
      statusMessage: "Success",
    };
  },
);
