import type { paths } from "~/types/api.types";

export type StoryDeleteRequest = paths["/stories/{id}"]["delete"]["parameters"]["query"];
export type StoryDeleteResponse = paths["/stories/{id}"]["delete"]["responses"]["200"]["content"]["application/json"];
