import type { paths } from "@/types/api.types";

export type ProjectPutRequest =
  paths["/projects/{id}"]["put"]["requestBody"]["content"]["application/json"];
export type ProjectPutResponse =
  paths["/projects/{id}"]["put"]["responses"]["200"]["content"]["application/json"];
