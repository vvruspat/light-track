import type { paths } from "~/types/api.types";

export type ProjectGetRequest = paths["/projects"]["get"]["parameters"]["query"];
export type ProjectGetResponse = paths["/projects"]["get"]["responses"]["200"]["content"]["application/json"];
