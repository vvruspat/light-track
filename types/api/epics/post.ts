import type { paths } from "@/types/api.types";

export type EpicPostRequest =
  paths["/epics"]["post"]["requestBody"]["content"]["application/json"];
export type EpicPostResponse =
  paths["/epics"]["post"]["responses"]["201"]["content"]["application/json"];
