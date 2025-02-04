import type { Database } from "@/types/database.types";

export type TProject = Database["public"]["Tables"]["projects"]["Row"];
export type TStory = Database["public"]["Tables"]["stories"]["Row"];
export type TEpic = Database["public"]["Tables"]["epics"]["Row"];
export type TTask = Database["public"]["Tables"]["tasks"]["Row"];
export type TFullStory = TStory & {
  tasks: Required<TTask>[];
};
export type TFullEpic = Required<TEpic> & {
  stories: TFullStory[];
};
export type TFullProject = Required<TProject> & {
  epics: TFullEpic[];
};

export type TStatistics = {
  total: number;
  todo: number;
  progress: number;
  done: number;
  rejected: number;
};

export type TProjectStatistics = {
  project: TStatistics;
  epics: {
    [key: number]: TStatistics;
  };
  stories: {
    [key: number]: TStatistics;
  };
};
