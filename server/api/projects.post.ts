import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import type { ProjectPostRequest, ProjectPostResponse } from "@/types/api";
import Ajv from "ajv";
import { paths } from "@/public/_openapi.json";
import useLightTrackSession from "@/utils/useLightTrackSession";
import type { TFullProject } from "@/types/entities";

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

    if (body.template_id) {
      const { data: template, error: templateError } = await client
        .from("templates")
        .select()
        .eq("id", body.template_id)
        .single();

      if (templateError) {
        throw createError({ statusMessage: templateError.message });
      }

      if (!template) {
        return {
          statusCode: 404,
          statusMessage: "Not Found",
          message: "Template not found",
        };
      }

      const templateData: TFullProject = JSON.parse(
        template.template as string,
      );

      // Create epics
      const epics = templateData.epics.map((epic) => ({
        title: epic.title,
        description: epic.description,
        owner_id: user.id,
        project_id: data.id,
      }));

      const { data: epicsData, error: epicsError } = await client
        .from("epics")
        .insert(epics)
        .select();

      if (epicsError) {
        throw createError({ statusMessage: epicsError.message });
      }

      // Create stories
      const stories = templateData.epics.flatMap((epic, epicIndex) =>
        epic.stories.map((story) => ({
          title: story.title,
          description: story.description,
          owner_id: user.id,
          epic_id: epicsData[epicIndex].id,
        })),
      );

      const { data: storiesData, error: storiesError } = await client
        .from("stories")
        .insert(stories)
        .select();

      if (storiesError) {
        throw createError({ statusMessage: storiesError.message });
      }

      let storyIndex = -1;

      // Create tasks
      const tasks = templateData.epics.flatMap((epic) =>
        epic.stories.flatMap((story) => {
          storyIndex++;
          return story.tasks.map((task) => ({
            title: task.title,
            description: task.description,
            owner_id: user.id,
            story_id: storiesData[storyIndex].id,
            assignee_id: user.id,
            status: "todo",
            estimation: task.estimation,
          }));
        }),
      );

      const { error: tasksError } = await client
        .from("tasks")
        .insert(tasks)
        .select();

      if (tasksError) {
        throw createError({ statusMessage: tasksError.message });
      }
    }

    // Return the created project
    return {
      statusCode: 201,
      statusMessage: "Created",
      data: data,
    };
  },
);
