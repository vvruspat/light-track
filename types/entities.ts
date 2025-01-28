import type { Database } from "@/types/database.types";

export type TProject = Database["public"]["Tables"]["projects"]["Row"];
export type TStory = Database["public"]["Tables"]["stories"]["Row"];
export type TEpic = Database["public"]["Tables"]["epics"]["Row"];
export type TTask = Database["public"]["Tables"]["tasks"]["Row"];
