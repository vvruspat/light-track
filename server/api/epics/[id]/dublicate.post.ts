import { defineEventHandler, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import getLightTrackSession from "@/utils/getLightTrackSession";
import type {
  EpicDublicatePostResponse,
} from "@/types/api";

export default defineEventHandler(
  async (event): Promise<EpicDublicatePostResponse> => {

    const epicId = Number(event.context.params?.id);
    const client = await serverSupabaseClient<Database>(event);

    const { chatId, ...user } = await getLightTrackSession(event);

    // Validate the request body
    if (!epicId && !Number.isNaN(epicId)) {
      return {
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Epic id is required",
      };
    }

    const { data: epic, error: epicError } = await client
      .from("epics")
      .select(
        `
        *,
        stories (
          *,
          tasks (
            *
          )
        )
      `,
      )
      .eq("id", epicId)
      .single();

    if (epicError) {
      throw createError({ statusMessage: epicError.message });
    }

    if (!epic) {
      return {
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Project not found",
      };
    }

    const { id, owner_id, stories, ...e } = epic;
    const storiesCleared = epic.stories.map((story) => {
      const { id, owner_id, tasks, ...s } = story;
      const tasksCleared = story.tasks.map((task) => {
        const { id, owner_id, ...t } = task;
        return { ...t, owner_id: user.id };
      });
      return { ...s, owner_id: user.id, tasks: tasksCleared };
    });

    const epicTemplate = { ...e, owner_id: user.id, stories: storiesCleared };

    // Create epic

    const title = epic.title.match(/(.*) \((\d+)\)/);
    const newTitle = title
      ? `${title[1]} (${Number(title[2]) + 1})`
      : `${epic.title} (1)`;
    epicTemplate.title = newTitle;

    const { data: epicsData, error: epicsError } = await client
      .from("epics")
      .insert(
        [
          {
            title: epicTemplate.title, description: epicTemplate.description, project_id: epicTemplate.project_id, owner_id: user.id
          }
        ],
      )
      .select()
      .single();

    if (epicsError) {
      throw createError({ statusMessage: epicsError.message });
    }

    // Create stories
    const storiesTemplate = epicTemplate.stories.map((story) => ({
      title: story.title,
      description: story.description,
      owner_id: user.id,
      epic_id: epicsData.id,
    }));

    const { data: storiesData, error: storiesError } = await client
      .from("stories")
      .insert(storiesTemplate)
      .select();

    if (storiesError) {
      throw createError({ statusMessage: storiesError.message });
    }

    let storyIndex = -1;

    // Create tasks
    const tasksTemplate = epicTemplate.stories.flatMap((story) => {
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
    });

    const { error: tasksError } = await client
      .from("tasks")
      .insert(tasksTemplate)
      .select();

    if (tasksError) {
      throw createError({ statusMessage: tasksError.message });
    }

    return {
      statusCode: 201,
      statusMessage: "Created",
      data: {
        id: epicsData.id,
      },
    };
  },
);
