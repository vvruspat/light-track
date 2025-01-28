import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { ProjectPutRequest, ProjectPutResponse } from "@/types/api";
import { paths } from "@/public/_openapi.json";
import Ajv from "ajv";

export default defineEventHandler(
  async (event): Promise<ProjectPutResponse> => {
    const body = await readValidatedBody<ProjectPutRequest>(event, (b) => {
      const ajv = new Ajv();
      const schema =
        paths["/projects/{id}"]["put"]["requestBody"]["content"][
          "application/json"
        ].schema;
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

    const { data: project, error: selectProjectError } = await client
      .from("projects")
      .select()
      .eq("id", id)
      .single();

    if (selectProjectError) {
      throw createError({ statusMessage: selectProjectError.message });
    }

    if (!project) {
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Project not found",
      };
    }

    if (project.owner_id !== user.id) {
      return {
        statusCode: 403,
        statusMessage: "Forbidden",
        message: "You are not the owner of this project",
      };
    }

    // Create the project (this is a placeholder, replace with actual logic)
    const updatedProject: Database["public"]["Tables"]["projects"]["Update"] = {
      ...project,
      ...body,
    };

    const { data, error } = await client
      .from("projects")
      .update(updatedProject)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the updated project
    return {
      statusCode: 200,
      statusMessage: "Updated",
      data: data,
    };
  },
);
