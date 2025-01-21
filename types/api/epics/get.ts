import type { paths } from "~/types/api.types";

export type EpicGetRequest = paths["/epics"]["get"]["parameters"]["query"];
export type EpicGetResponse = paths["/epics"]["get"]["responses"]["200"]["content"]["application/json"];
