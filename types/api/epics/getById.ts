import type { paths } from "@/types/api.types";

export type EpicGetByIdRequest =
  paths["/epics/{id}"]["get"]["parameters"]["query"];
export type EpicGetByIdResponse =
  paths["/epics/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
