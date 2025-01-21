import type { paths } from "~/types/api.types";

export type StoryPutRequest = paths["/stories"]["put"]["requestBody"]["content"]["application/json"];
export type StoryPutResponse = paths["/stories"]["put"]["responses"]["200"]["content"]["application/json"];
