import type { paths } from "@/types/api.types";

export type ProjectTemplatePostRequest =
  paths["/projects/template"]["post"]["requestBody"]["content"]["application/json"];
export type ProjectTemplatePostResponse =
  paths["/projects/template"]["post"]["responses"]["201"]["content"]["application/json"];
