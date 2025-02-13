import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { StoryPostRequest, StoryPostResponse } from "@/types/api";
import { paths } from "@/public/_openapi.json";
import Ajv from "ajv";

export default defineEventHandler(async (event): Promise<StoryPostResponse> => {
  const body = await readValidatedBody<StoryPostRequest>(event, (b) => {
    const ajv = new Ajv();
    const schema =
      paths["/stories"]["post"]["requestBody"]["content"]["application/json"]
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

  if (!body.epic_id) {
    return {
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Project ID is required",
    };
  }

  // Create the epic (this is a placeholder, replace with actual logic)
  const newEpic: Database["public"]["Tables"]["stories"]["Insert"] = {
    owner_id: user.id,
    ...body,
    epic_id: body.epic_id,
    description: body.description ?? "",
  };

  const { data, error } = await client
    .from("stories")
    .insert([newEpic])
    .select()
    .single();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  // Return the created epic
  return {
    statusCode: 201,
    statusMessage: "Created",
    data: data,
  };
});
