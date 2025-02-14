import type { paths } from "~/types/api.types";

export type UsersGetResponse =
  paths["/users"]["get"]["responses"]["200"]["content"]["application/json"];
