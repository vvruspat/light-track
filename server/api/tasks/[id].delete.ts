import { defineEventHandler, getRouterParam, createError } from "h3";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { TaskDeleteResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<TaskDeleteResponse> => {
    const id = Number(getRouterParam(event, "id"));

    const client = await serverSupabaseClient<Database>(event);
    const user = await serverSupabaseUser(event);

    // Ensure the user is authenticated
    if (!user?.id) {
      return {
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "You need to be logged in to remove an task",
      };
    }

    if (!id || Number.isNaN(id)) {
      return {
        statusCode: 404,
        statusMessage: "Bad Request",
        message: "Task not found",
      };
    }

    const { error } = await client.from("tasks").delete().eq("id", id);

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the created task
    return {
      statusCode: 200,
      statusMessage: "Success",
    };
  },
);
