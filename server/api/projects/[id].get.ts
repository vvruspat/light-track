import { defineEventHandler, createError, getRouterParam } from "h3";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "~/types/database.types";
import type { ProjectGetByIdResponse } from "~/types/api";

export default defineEventHandler(
  async (event): Promise<ProjectGetByIdResponse> => {
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
        message: "Project not found",
      };
    }

    const { data } = await client
      .from("projects")
      .select()
      .eq("id", id)
      .single();

    if (!data) {
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Project not found",
      };
    }

    // Return the created project
    return {
      statusCode: 200,
      statusMessage: "Success",
      data,
    };
  }
);
