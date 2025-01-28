import type { paths } from "@/types/api.types";

export type StoryGetByIdRequest =
  paths["/stories/{id}"]["get"]["parameters"]["query"];
export type StoryGetByIdResponse =
  paths["/stories/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
