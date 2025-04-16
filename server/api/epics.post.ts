import { paths } from "@/public/_openapi.json";
import type { EpicPostRequest, EpicPostResponse } from "@/types/api";
import type { Database } from "@/types/database.types";
import Ajv from "ajv";
import { createError, defineEventHandler, readValidatedBody } from "h3";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event): Promise<EpicPostResponse> => {
  const body = await readValidatedBody<EpicPostRequest>(event, (b) => {
    const ajv = new Ajv();
    const schema =
      paths["/epics"].post.requestBody.content["application/json"].schema;
    const valid = ajv.validate(schema, b);

    if (!valid) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request body",
        message: ajv.errorsText(),
      });
    }
    return true;
  });
  const client = await serverSupabaseClient<Database>(event);
  const user = event.context.user;

  if (!body.project_id) {
    return {
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Project ID is required",
    };
  }

  // Create the epic (this is a placeholder, replace with actual logic)
  const newEpic: Database["public"]["Tables"]["epics"]["Insert"] = {
    owner_id: user.id,
    ...body,
    description: body.description ?? "",
  };

  const { data, error } = await client
    .from("epics")
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
