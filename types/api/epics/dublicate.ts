import type { paths } from "@/types/api.types";

export type EpicDublicatePostRequest =
  paths["/epics/{id}/dublicate"]["post"]["parameters"]["path"];
export type EpicDublicatePostResponse =
  paths["/epics/{id}/dublicate"]["post"]["responses"]["201"]["content"]["application/json"];
