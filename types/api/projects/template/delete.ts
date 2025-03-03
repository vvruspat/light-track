import type { paths } from "@/types/api.types";

export type ProjectTemplateDeleteRequest =
  paths["/projects/template/{id}"]["delete"]["parameters"]["query"];
export type ProjectTemplateDeleteResponse =
  paths["/projects/template/{id}"]["delete"]["responses"]["200"]["content"]["application/json"];
