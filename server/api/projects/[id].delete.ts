import type { ProjectDeleteResponse } from "@/types/api";
import type { Database } from "@/types/database.types";
import { createError, defineEventHandler, getRouterParam } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(
  async (event): Promise<ProjectDeleteResponse> => {
    const id = Number(getRouterParam(event, "id"));

    const client = await serverSupabaseClient<Database>(event);

    if (!id || Number.isNaN(id)) {
      return {
        statusCode: 404,
        statusMessage: "Bad Request",
        message: "Project not found",
      };
    }

    const { error } = await client.from("projects").delete().eq("id", id);

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the created project
    return {
      statusCode: 200,
      statusMessage: "Success",
    };
  },
);
