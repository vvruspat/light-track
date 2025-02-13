import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { EpicPutRequest, EpicPutResponse } from "@/types/api";
import { paths } from "@/public/_openapi.json";
import Ajv from "ajv";

export default defineEventHandler(async (event): Promise<EpicPutResponse> => {
  const body = await readValidatedBody<EpicPutRequest>(event, (b) => {
    const ajv = new Ajv();
    const schema =
      paths["/epics/{id}"]["put"]["requestBody"]["content"]["application/json"]
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

  const id = Number(getRouterParam(event, "id"));

  const { data: epic, error: selectEpicError } = await client
    .from("epics")
    .select()
    .eq("id", id)
    .single();

  if (selectEpicError) {
    throw createError({ statusMessage: selectEpicError.message });
  }

  if (!epic) {
    return {
      statusCode: 404,
      statusMessage: "Not Found",
      message: "Epic not found",
    };
  }

  if (epic.owner_id !== user.id) {
    return {
      statusCode: 403,
      statusMessage: "Forbidden",
      message: "You are not the owner of this epic",
    };
  }

  // Create the epic (this is a placeholder, replace with actual logic)
  const updatedEpic: Database["public"]["Tables"]["epics"]["Update"] = {
    ...epic,
    ...body,
  };

  const { data, error } = await client
    .from("epics")
    .update(updatedEpic)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  // Return the updated epic
  return {
    statusCode: 200,
    statusMessage: "Updated",
    data: data,
  };
});
