import { defineEventHandler, getRouterParam, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { ProjectTemplateDeleteResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<ProjectTemplateDeleteResponse> => {
    const id = Number(getRouterParam(event, "id"));

    const client = await serverSupabaseClient<Database>(event);

    if (!id || Number.isNaN(id)) {
      return {
        statusCode: 404,
        statusMessage: "Bad Request",
        message: "Template not found",
      };
    }

    const { error } = await client.from("templates").delete().eq("id", id);

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    return {
      statusCode: 200,
      statusMessage: "Success",
    };
  },
);
