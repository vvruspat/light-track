import type { paths } from "@/types/api.types";

export type TaskGetRequest = paths["/tasks"]["get"]["parameters"]["query"];
export type TaskGetResponse =
  paths["/tasks"]["get"]["responses"]["200"]["content"]["application/json"];
