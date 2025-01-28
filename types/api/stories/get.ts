import type { paths } from "@/types/api.types";

export type StoryGetRequest = paths["/stories"]["get"]["parameters"]["query"];
export type StoryGetResponse =
  paths["/stories"]["get"]["responses"]["200"]["content"]["application/json"];
