import type { paths } from "~/types/api.types";

export type ProjectGetByIdRequest = paths["/projects/{id}"]["get"]["parameters"]["query"];
export type ProjectGetByIdResponse = paths["/projects/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
