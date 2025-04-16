import type { ProjectGetByIdResponse } from "@/types/api";
import type { Database } from "@/types/database.types";
import { defineEventHandler, getRouterParam } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(
  async (event): Promise<ProjectGetByIdResponse> => {
    const client = await serverSupabaseClient<Database>(event);
    const id = Number(getRouterParam(event, "id"));

    if (!id || Number.isNaN(id)) {
      return {
        statusCode: 404,
        statusMessage: "Bad Request",
        message: "Project not found",
      };
    }

    const { data, error } = await client
      .from("projects")
      .select(
        `
        *,
        epics (
          *,
          stories (
            *,
            tasks (
              *
            )
          )
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) {
      return {
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message,
      };
    }

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
  },
);
