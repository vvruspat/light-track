import type { paths } from "@/types/api.types";

export type TaskPostRequest =
  paths["/tasks"]["post"]["requestBody"]["content"]["application/json"];
export type TaskPostResponse =
  paths["/tasks"]["post"]["responses"]["201"]["content"]["application/json"];
