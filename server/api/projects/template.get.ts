import { defineEventHandler, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import getLightTrackSession from "@/utils/getLightTrackSession";
import type { ProjectTemplateGetResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<ProjectTemplateGetResponse> => {
    const client = await serverSupabaseClient<Database>(event);
    const { chatId } = await getLightTrackSession(event);

    const { data, error } = await client
      .from("templates")
      .select("id, title, description, chat_id")
      .eq("chat_id", chatId)
      .order("id", { ascending: false });

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the list of templates
    return {
      statusCode: 200,
      statusMessage: "Success",
      data: data.map((template) => ({
        ...template,
        template: "",
      })),
    };
  },
);
