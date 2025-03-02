import type { paths } from "@/types/api.types";

export type ProjectTemplateGetRequest =
  paths["/projects/template"]["get"]["parameters"]["query"];
export type ProjectTemplateGetResponse =
  paths["/projects/template"]["get"]["responses"]["200"]["content"]["application/json"];
