import type { paths } from "~/types/api.types";

export type TaskPutRequest = paths["/tasks"]["put"]["requestBody"]["content"]["application/json"];
export type TaskPutResponse = paths["/tasks"]["put"]["responses"]["200"]["content"]["application/json"];
