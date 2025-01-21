import type { paths } from "~/types/api.types";

export type ProjectPutRequest = paths["/projects"]["put"]["requestBody"]["content"]["application/json"];
export type ProjectPutResponse = paths["/projects"]["put"]["responses"]["200"]["content"]["application/json"];
