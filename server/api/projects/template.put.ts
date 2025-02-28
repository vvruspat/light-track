import { defineEventHandler, readValidatedBody, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import Ajv from "ajv";
import { paths } from "@/public/_openapi.json";
import type {
  ProjectTemplatePutRequest,
  ProjectTemplatePutResponse,
} from "@/types/api";

export default defineEventHandler(
  async (event): Promise<ProjectTemplatePutResponse> => {
    const body = await readValidatedBody<ProjectTemplatePutRequest>(
      event,
      (b) => {
        const ajv = new Ajv();
        const schema =
          paths["/projects/template"]["put"]["requestBody"]["content"][
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

    const { data: currentTemplate, error: currentTemplateError } = await client
      .from("templates")
      .select()
      .eq("id", body.id)
      .single();

    if (currentTemplateError) {
      throw createError({ statusMessage: currentTemplateError.message });
    }

    const template: Database["public"]["Tables"]["templates"]["Insert"] = {
      ...currentTemplate,
      title: body.title ?? currentTemplate.title,
      description: body.description ?? currentTemplate.description,
    };

    const { data, error } = await client
      .from("templates")
      .upsert([template])
      .select()
      .single();

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    // Return the created project
    return {
      statusCode: 201,
      statusMessage: "Updated",
      data: { ...data, template: JSON.parse(data.template as string) },
    };
  },
);
