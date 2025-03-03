import type { paths } from "@/types/api.types";

export type ProjectTemplatePutRequest =
  paths["/projects/template/{id}"]["put"]["requestBody"]["content"]["application/json"];
export type ProjectTemplatePutResponse =
  paths["/projects/template/{id}"]["put"]["responses"]["200"]["content"]["application/json"];
