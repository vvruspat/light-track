import type { EpicGetByIdResponse } from "@/types/api";
import type { Database } from "@/types/database.types";
import { defineEventHandler, getRouterParam } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(
  async (event): Promise<EpicGetByIdResponse> => {
    const client = await serverSupabaseClient<Database>(event);
    const id = Number(getRouterParam(event, "id"));

    if (!id || Number.isNaN(id)) {
      return {
        statusCode: 404,
        statusMessage: "Bad Request",
        message: "Epic not found",
      };
    }

    const { data } = await client.from("epics").select().eq("id", id).single();

    if (!data) {
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Epic not found",
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
