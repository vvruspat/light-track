import { defineEventHandler, getQuery, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import {
  REQUEST_DEFAULT_LIMIT,
  REQUEST_DEFAULT_OFFSET,
  REQUEST_DEFAULT_SORT,
  REQUEST_DEFAULT_DIRECTION,
} from "@/constants/request";
import type { Database } from "@/types/database.types";
import type { TaskGetRequest, TaskGetResponse } from "@/types/api";

export default defineEventHandler(async (event): Promise<TaskGetResponse> => {
  const {
    story_id,
    limit = REQUEST_DEFAULT_LIMIT,
    offset = REQUEST_DEFAULT_OFFSET,
    sort = REQUEST_DEFAULT_SORT,
    direction = REQUEST_DEFAULT_DIRECTION,
  } = getQuery<TaskGetRequest>(event);

  const client = await serverSupabaseClient<Database>(event);

  // Ensure the user is authenticated
  if (!story_id) {
    return {
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Provide either a story_id or owner_id",
    };
  }

  const { data, error } = await client
    .from("tasks")
    .select()
    .filter("story_id", "eq", story_id)
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
