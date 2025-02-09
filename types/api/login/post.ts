import type { paths } from "@/types/api.types";

export type LoginPostRequest =
  paths["/login"]["post"]["requestBody"]["content"]["application/json"];
export type LoginPostResponse =
  paths["/login"]["post"]["responses"]["200"]["content"]["application/json"];
