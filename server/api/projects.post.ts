import { defineEventHandler, readBody, createError } from "h3";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "@/types/database.types";
import { ProjectPostRequest, ProjectPostResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<ProjectPostResponse> => {
    const body = await readBody<ProjectPostRequest>(event);
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

    // Validate the request body
    if (!body.title) {
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Title is required",
      };
    }

    if (!body.groupId) {
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Group ID is required",
      };
    }

    // Create the project (this is a placeholder, replace with actual logic)
    const newProject: Database["public"]["Tables"]["projects"]["Insert"] = {
      title: body.title,
      description: body.description || "",
      groupId: body.groupId,
      ownerId: user.id,
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
  }
);
