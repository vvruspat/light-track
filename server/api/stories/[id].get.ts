import { defineEventHandler, getRouterParam } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { StoryGetByIdResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<StoryGetByIdResponse> => {
    const client = await serverSupabaseClient<Database>(event);
    const id = Number(getRouterParam(event, "id"));

    if (!id || Number.isNaN(id)) {
      return {
        statusCode: 404,
        statusMessage: "Bad Request",
        message: "Story not found",
      };
    }

    const { data } = await client
      .from("stories")
      .select()
      .eq("id", id)
      .single();

    if (!data) {
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Story not found",
      };
    }

    // Return the created epic
    return {
      statusCode: 200,
      statusMessage: "Success",
      data,
    };
  },
);
