import type { paths } from "@/types/api.types";

export type StoryPostRequest =
  paths["/stories"]["post"]["requestBody"]["content"]["application/json"];
export type StoryPostResponse =
  paths["/stories"]["post"]["responses"]["201"]["content"]["application/json"];
