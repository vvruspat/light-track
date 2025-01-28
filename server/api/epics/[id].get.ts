import { defineEventHandler, getRouterParam } from "h3";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { EpicGetByIdResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<EpicGetByIdResponse> => {
    const client = await serverSupabaseClient<Database>(event);
    const user = await serverSupabaseUser(event);
    const id = Number(getRouterParam(event, "id"));

    if (!user) {
      return {
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Authentication is required",
      };
    }

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
