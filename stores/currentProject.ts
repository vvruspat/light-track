import type { ProjectGetByIdResponse } from "@/types/api";
import type { TLoadingState } from "@/types/common";
import type {
  TEpic,
  TFullEpic,
  TFullProject,
  TFullStory,
  TProject,
  TProjectStatistics,
  TStatistics,
  TStory,
  TTask,
} from "@/types/entities";
import { defineStore } from "pinia";

type ProjectState = {
  currentProject: TFullProject | null;
  loadingState: TLoadingState;
};

type ProjectGetters = {
  statistics: (state: ProjectState) => TProjectStatistics;
};

type ProjectActions = {
  getProjectById: (
    projectId: TProject["id"],
    force?: boolean,
  ) => Promise<TFullProject | null>;
  updateProjectData: (project: Partial<TProject>) => void;
  updateEpicData: (epic: Partial<TEpic>) => void;
  updateStoryData: (story: Partial<TStory>) => void;
  updateTaskData: (task: Partial<TTask>) => void;
};

const filterProjectTasks = (
  currentProject: TFullProject,
  status: TTask["status"],
) => {
  return currentProject.epics.reduce(
    (acc, epic) =>
      acc +
      epic.stories.reduce(
        (acc, story) =>
          acc + story.tasks.filter((task) => task.status === status).length,
        0,
      ),
    0,
  );
};

const filterEpicTasks = (currentEpic: TFullEpic, status: TTask["status"]) => {
  return currentEpic.stories.reduce(
    (acc, story) =>
      acc + story.tasks.filter((task) => task.status === status).length,
    0,
  );
};

const filterStoryTasks = (
  currentStory: TFullStory,
  status: TTask["status"],
) => {
  return currentStory.tasks.filter((task) => task.status === status).length;
};

export const useCurrentProjectStore = defineStore<
  "currentProject",
  ProjectState,
  ProjectGetters,
  ProjectActions
>("currentProject", {
  state: () => ({
    currentProject: null,
    loadingState: "idle",
    error: null,
  }),

  getters: {
    statistics(state) {
      if (!state.currentProject) {
        return {
          project: {
            total: 0,
            done: 0,
            progress: 0,
            todo: 0,
            rejected: 0,
          },
          epics: {
            total: 0,
            done: 0,
            progress: 0,
            todo: 0,
            rejected: 0,
          },
          stories: {
            total: 0,
            done: 0,
            progress: 0,
            todo: 0,
            rejected: 0,
          },
        };
      }

      return {
        project: {
          total: state.currentProject.epics.reduce(
            (acc, epic) =>
              acc +
              epic.stories.reduce((acc, story) => acc + story.tasks.length, 0),
            0,
          ),
          done: filterProjectTasks(state.currentProject, "done"),
          progress: filterProjectTasks(state.currentProject, "progress"),
          todo: filterProjectTasks(state.currentProject, "todo"),
          rejected: filterProjectTasks(state.currentProject, "rejected"),
        },
        epics: state.currentProject.epics.reduce<Record<number, TStatistics>>(
          (acc, epic) => {
            const newEpicStat: TStatistics = {
              total: epic.stories.reduce(
                (acc, story) => acc + story.tasks.length,
                0,
              ),
              done: filterEpicTasks(epic, "done"),
              progress: filterEpicTasks(epic, "progress"),
              todo: filterEpicTasks(epic, "todo"),
              rejected: filterEpicTasks(epic, "rejected"),
            };

            acc[epic.id] = newEpicStat;

            return acc;
          },
          {},
        ),

        stories: state.currentProject.epics.reduce(
          (acc, epic) =>
            epic.stories.reduce<Record<number, TStatistics>>((acc, story) => {
              const newStoryStat: TStatistics = {
                total: story.tasks.length,
                done: filterStoryTasks(story, "done"),
                progress: filterStoryTasks(story, "progress"),
                todo: filterStoryTasks(story, "todo"),
                rejected: filterStoryTasks(story, "rejected"),
              };

              acc[story.id] = newStoryStat;

              return acc;
            }, {}),
          {},
        ),
      };
    },
  },

  actions: {
    updateProjectData(project: Partial<TProject>) {
      if (!this.currentProject) {
        return;
      }

      this.currentProject = {
        ...this.currentProject,
        ...project,
      };
    },

    updateEpicData(epic: Partial<TEpic>) {
      if (!this.currentProject) {
        return;
      }

      this.currentProject.epics = this.currentProject.epics.map((e) => {
        if (e.id === epic.id) {
          return {
            ...e,
            ...epic,
          };
        }

        return e;
      });
    },

    updateStoryData(story: Partial<TStory>) {
      if (!this.currentProject) {
        return;
      }

      this.currentProject.epics = this.currentProject.epics.map((epic) => {
        epic.stories = epic.stories.map((s) => {
          if (s.id === story.id) {
            return {
              ...s,
              ...story,
            };
          }

          return s;
        });

        return epic;
      });
    },

    updateTaskData(task: Partial<TTask>) {
      if (!this.currentProject) {
        return;
      }

      this.currentProject.epics = this.currentProject.epics.map((epic) => {
        epic.stories = epic.stories.map((story) => {
          story.tasks = story.tasks.map((t) => {
            if (t.id === task.id) {
              return {
                ...t,
                ...task,
              };
            }

            return t;
          });

          return story;
        });

        return epic;
      });
    },

    async getProjectById(projectId: TProject["id"], force = false) {
      if (!force && this.currentProject?.id === projectId) {
        return this.currentProject;
      }

      try {
        this.loadingState = "pending";

        const data = await $api<ProjectGetByIdResponse>(
          `/api/projects/${projectId}`,
          { method: "GET" },
        );

        if (data.statusCode && data.statusCode >= 300) {
          throw Error(data.statusMessage);
        }

        if (data.data) {
          this.loadingState = "success";
          this.currentProject = data.data;
          return data.data;
        }
      } catch (error) {
        this.loadingState = "error";
        console.error(error);
        throw Error((error as Error).message);
      }
      return null;
    },
  },
});
