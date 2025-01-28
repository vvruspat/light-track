import type { paths } from "@/types/api.types";

export type ProjectDeleteRequest =
  paths["/projects/{id}"]["delete"]["parameters"]["query"];
export type ProjectDeleteResponse =
  paths["/projects/{id}"]["delete"]["responses"]["200"]["content"]["application/json"];
