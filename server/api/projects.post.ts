import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { ProjectPostRequest, ProjectPostResponse } from "@/types/api";
import Ajv from "ajv";
import { paths } from "@/public/_openapi.json";
import useLightTrackSession from "@/utils/useLightTrackSession";

export default defineEventHandler(
  async (event): Promise<ProjectPostResponse> => {
    const body = await readValidatedBody<ProjectPostRequest>(event, (b) => {
      const ajv = new Ajv();
      const schema =
        paths["/projects"]["post"]["requestBody"]["content"]["application/json"]
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

    const { chatId, ...user } = useLightTrackSession(event);

    // Validate the request body
    if (!body.title) {
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Title is required",
      };
    }

    if (!chatId) {
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Chat ID is required",
      };
    }

    // Create the project (this is a placeholder, replace with actual logic)
    const newProject: Database["public"]["Tables"]["projects"]["Insert"] = {
      title: body.title,
      description: body.description || "",
      chat_id: Number(chatId),
      owner_id: user.id,
    };

    const { data, error } = await client
      .from("projects")
      .insert([newProject])
      .select()
      .single();

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the created project
    return {
      statusCode: 201,
      statusMessage: "Created",
      data: data,
    };
  },
);
