import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import Ajv from "ajv";
import { paths } from "@/public/_openapi.json";
import getLightTrackSession from "@/utils/getLightTrackSession";
import type {
  ProjectTemplatePostRequest,
  ProjectTemplatePostResponse,
} from "@/types/api";

export default defineEventHandler(
  async (event): Promise<ProjectTemplatePostResponse> => {
    const body = await readValidatedBody<ProjectTemplatePostRequest>(
      event,
      (b) => {
        const ajv = new Ajv();
        const schema =
          paths["/projects/template"]["post"]["requestBody"]["content"][
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
      },
    );
    const client = await serverSupabaseClient<Database>(event);

    const { chatId, ...user } = await getLightTrackSession(event);

    // Validate the request body
    if (!body.project_id) {
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Project id is required",
      };
    }

    const { data: project, error: projectError } = await client
      .from("projects")
      .select(
        `
      *,
      epics (
        *,
        stories (
          *,
          tasks (
            *
          )
        )
      )
    `,
      )
      .eq("id", body.project_id)
      .single();

    if (projectError) {
      throw createError({ statusMessage: projectError.message });
    }

    if (!project) {
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Project not found",
      };
    }

    const epics = project.epics.map((epic) => {
      const { id, owner_id, stories, ...e } = epic;
      const storiesCleared = epic.stories.map((story) => {
        const { id, owner_id, tasks, ...s } = story;
        const tasksCleared = story.tasks.map((task) => {
          const { id, owner_id, ...t } = task;
          return { ...t, owner_id: user.id };
        });
        return { ...s, owner_id: user.id, tasks: tasksCleared };
      });
      return { ...e, owner_id: user.id, stories: storiesCleared };
    });

    const template = {
      ...project,
      owner_id: user.id,
      epics,
    };

    // Create the project (this is a placeholder, replace with actual logic)
    const newTemplate: Database["public"]["Tables"]["templates"]["Insert"] = {
      title: `Template: ${project.title}`,
      description: `This is a template based on the project: ${project.title}`,
      owner_id: user.id,
      template: JSON.stringify(template),
    };

    const { data, error } = await client
      .from("templates")
      .insert([newTemplate])
      .select()
      .single();

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the created project
    return {
      statusCode: 201,
      statusMessage: "Created",
      data: { ...data, template: JSON.parse(data.template as string) },
    };
  },
);
