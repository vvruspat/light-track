import type { EpicDeleteResponse } from "@/types/api";
import type { Database } from "@/types/database.types";
import { createError, defineEventHandler, getRouterParam } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(
  async (event): Promise<EpicDeleteResponse> => {
    const id = Number(getRouterParam(event, "id"));

    const client = await serverSupabaseClient<Database>(event);

    if (!id || Number.isNaN(id)) {
      return {
        statusCode: 404,
        statusMessage: "Bad Request",
        message: "Epic not found",
      };
    }

    const { error } = await client.from("epics").delete().eq("id", id);

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the created epic
    return {
      statusCode: 200,
      statusMessage: "Success",
    };
  },
);
