import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "@/types/database.types";
import { StoryPutRequest, StoryPutResponse } from "@/types/api";
import { paths } from "~/public/_openapi.json";
import Ajv from "ajv";

export default defineEventHandler(
  async (event): Promise<StoryPutResponse> => {
    const body = await readValidatedBody<StoryPutRequest>(event, (b) => {
      const ajv = new Ajv();
      const schema = paths["/stories/{id}"]["put"]["requestBody"]["content"]["application/json"].schema;
      const valid = ajv.validate(schema, b);

      if (!valid) {
        throw createError({ statusCode: 400, statusMessage: "Invalid request body", message: ajv.errorsText() });
      } else {
        return true;
      }
    });

    const client = await serverSupabaseClient<Database>(event);
    const user = await serverSupabaseUser(event);

    // Ensure the user is authenticated
    if (!user) {
      return {
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Authentication is required",
      };
    }

    const id = Number(getRouterParam(event, "id"));

    const { data: story, error: selectStoryError } = await client.from("stories").select().eq("id", id).single();

    if (selectStoryError) {
      throw createError({ statusMessage: selectStoryError.message });
    }

    if (!story) {
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Story not found",
      };
    }

    if (story.owner_id !== user.id) {
      return {
        statusCode: 403,
        statusMessage: "Forbidden",
        message: "You are not the owner of this Story",
      };
    }

    // Create the Story (this is a placeholder, replace with actual logic)
    const updatedStory: Database["public"]["Tables"]["stories"]["Update"] = {
      ...story,
      ...body,
    };

    const { data, error } = await client
      .from("stories")
      .update(updatedStory)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the updated Story
    return {
      statusCode: 200,
      statusMessage: "Updated",
      data: data,
    };
  }
);
