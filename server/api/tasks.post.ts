import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { TaskPostRequest, TaskPostResponse } from "@/types/api";
import { paths } from "@/public/_openapi.json";
import Ajv from "ajv";

export default defineEventHandler(async (event): Promise<TaskPostResponse> => {
  const body = await readValidatedBody<TaskPostRequest>(event, (b) => {
    const ajv = new Ajv();
    const schema =
      paths["/tasks"]["post"]["requestBody"]["content"]["application/json"]
        .schema;
    const valid = ajv.validate(schema, b);

    if (!valid) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request body",
        message: ajv.errorsText(),
      });
    } else {
      return true;
    }
  });
  const client = await serverSupabaseClient<Database>(event);
  const { user } = event.context;

  if (!body.story_id) {
    return {
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Story ID is required",
    };
  }

  // Create the task (this is a placeholder, replace with actual logic)
  const newTask: Database["public"]["Tables"]["tasks"]["Insert"] = {
    owner_id: user.id,
    ...body,
    story_id: body.story_id,
    estimation: body.estimation ?? 0,
    assignee_id: body.assignee_id ?? user.id,
    description: body.description ?? "",
  };

  const { data, error } = await client
    .from("tasks")
    .insert([newTask])
    .select()
    .single();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  // Return the created task
  return {
    statusCode: 201,
    statusMessage: "Created",
    data: data,
  };
});
