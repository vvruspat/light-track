import type { paths } from "@/types/api.types";

export type EpicDeleteRequest =
  paths["/epics/{id}"]["delete"]["parameters"]["query"];
export type EpicDeleteResponse =
  paths["/epics/{id}"]["delete"]["responses"]["200"]["content"]["application/json"];
