import type { paths } from "@/types/api.types";

export type ProjectTemplateDeleteRequest =
  paths["/projects/template"]["delete"]["parameters"]["query"];
export type ProjectTemplateDeleteResponse =
  paths["/projects/template"]["delete"]["responses"]["200"]["content"]["application/json"];
