import type { paths } from "~/types/api.types";

export type EpicPutRequest = paths["/epics"]["put"]["requestBody"]["content"]["application/json"];
export type EpicPutResponse = paths["/epics"]["put"]["responses"]["200"]["content"]["application/json"];
