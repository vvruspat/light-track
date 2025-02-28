import type { paths } from "@/types/api.types";

export type ProjectTemplatePutRequest =
  paths["/projects/template"]["put"]["requestBody"]["content"]["application/json"];
export type ProjectTemplatePutResponse =
  paths["/projects/template"]["put"]["responses"]["200"]["content"]["application/json"];
