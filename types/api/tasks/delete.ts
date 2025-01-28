import type { paths } from "@/types/api.types";

export type TaskDeleteRequest =
  paths["/tasks/{id}"]["delete"]["parameters"]["query"];
export type TaskDeleteResponse =
  paths["/tasks/{id}"]["delete"]["responses"]["200"]["content"]["application/json"];
