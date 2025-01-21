import type { paths } from "~/types/api.types";

export type TaskGetByIdRequest = paths["/tasks/{id}"]["get"]["parameters"]["query"];
export type TaskGetByIdResponse = paths["/tasks/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
