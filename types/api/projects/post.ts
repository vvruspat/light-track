import type { paths } from "@/types/api.types";

export type ProjectPostRequest =
  paths["/projects"]["post"]["requestBody"]["content"]["application/json"];
export type ProjectPostResponse =
  paths["/projects"]["post"]["responses"]["201"]["content"]["application/json"];
