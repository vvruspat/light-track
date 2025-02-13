import { defineEventHandler, getRouterParam } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { TaskGetByIdResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<TaskGetByIdResponse> => {
    const client = await serverSupabaseClient<Database>(event);
    const id = Number(getRouterParam(event, "id"));

    if (!id || Number.isNaN(id)) {
      return {
        statusCode: 404,
        statusMessage: "Bad Request",
        message: "Task not found",
      };
    }

    const { data } = await client.from("tasks").select().eq("id", id).single();

    if (!data) {
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Task not found",
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
