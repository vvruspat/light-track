import { defineEventHandler, getQuery, createError } from "h3";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import {
  REQUEST_DEFAULT_LIMIT,
  REQUEST_DEFAULT_OFFSET,
  REQUEST_DEFAULT_SORT,
  REQUEST_DEFAULT_DIRECTION,
} from "@/constants/request";
import type { Database } from "@/types/database.types";
import type { ProjectGetRequest, ProjectGetResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<ProjectGetResponse> => {
    const {
      group_id,
      owner_id,
      limit = REQUEST_DEFAULT_LIMIT,
      offset = REQUEST_DEFAULT_OFFSET,
      sort = REQUEST_DEFAULT_SORT,
      direction = REQUEST_DEFAULT_DIRECTION,
    } = getQuery<ProjectGetRequest>(event);

    const client = await serverSupabaseClient<Database>(event);
    const user = await serverSupabaseUser(event);

    if (!user) {
      return {
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Authentication is required",
      };
    }

    const ownerId = owner_id ?? user.id;

    // Ensure the user is authenticated
    if (!group_id && !ownerId) {
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Provide either a group_id or owner_id",
      };
    }

    const { data, error } = await client
      .from("projects")
      .select()
      .filter("group_id", "eq", group_id)
      .filter("owner_id", "eq", ownerId)
      .range(offset, limit + offset)
      .order(sort, { ascending: direction === "asc" });

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the created project
    return {
      statusCode: 200,
      statusMessage: "Success",
      data,
    };
  },
);
