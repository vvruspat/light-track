import {
  REQUEST_DEFAULT_DIRECTION,
  REQUEST_DEFAULT_LIMIT,
  REQUEST_DEFAULT_OFFSET,
  REQUEST_DEFAULT_SORT,
} from "@/constants/request";
import type { StoryGetRequest, StoryGetResponse } from "@/types/api";
import type { Database } from "@/types/database.types";
import { createError, defineEventHandler, getQuery } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event): Promise<StoryGetResponse> => {
  const {
    epic_id,
    limit = REQUEST_DEFAULT_LIMIT,
    offset = REQUEST_DEFAULT_OFFSET,
    sort = REQUEST_DEFAULT_SORT,
    direction = REQUEST_DEFAULT_DIRECTION,
  } = getQuery<StoryGetRequest>(event);

  const client = await serverSupabaseClient<Database>(event);

  // Ensure the user is authenticated
  if (!epic_id) {
    return {
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Provide either a epic_id or owner_id",
    };
  }

  const { data, error } = await client
    .from("stories")
    .select()
    .filter("epic_id", "eq", epic_id)
    .range(offset, limit + offset)
    .order(sort, { ascending: direction === "asc" });

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  // Return the created epic
  return {
    statusCode: 200,
    statusMessage: "Success",
    data,
  };
});
