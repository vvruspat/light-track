import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/types/database.types";
import { TaskPutRequest, TaskPutResponse } from "~/types/api";
import { paths } from "~/public/_openapi.json";
import Ajv from "ajv";

export default defineEventHandler(
  async (event): Promise<TaskPutResponse> => {
    const body = await readValidatedBody<TaskPutRequest>(event, (b) => {
      const ajv = new Ajv();
      const schema = paths["/tasks/{id}"]["put"]["requestBody"]["content"]["application/json"].schema;
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

    const { data: task, error: selectTaskError } = await client.from("tasks").select().eq("id", id).single();

    if (selectTaskError) {
      throw createError({ statusMessage: selectTaskError.message });
    }

    if (!task) {
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Task not found",
      };
    }

    if (task.owner_id !== user.id) {
      return {
        statusCode: 403,
        statusMessage: "Forbidden",
        message: "You are not the owner of this Task",
      };
    }

    // Create the Task (this is a placeholder, replace with actual logic)
    const updatedTask: Database["public"]["Tables"]["tasks"]["Update"] = {
      ...task,
      ...body,
    };

    const { data, error } = await client
      .from("tasks")
      .update(updatedTask)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the updated Task
    return {
      statusCode: 200,
      statusMessage: "Updated",
      data: data,
    };
  }
);
