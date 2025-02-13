import { defineStore } from "pinia";
import type { TTask } from "@/types/entities";
import type { TaskPostResponse } from "@/types/api";
import type { TLoadingState } from "@/types/common";
import { useErrorsStore } from "@/stores/errors";

type TasksState = {
  loadingState: TLoadingState;
};

type TasksGetters = {
  currentProjectTasks: (state: TasksState) => TTask[];
};

type TasksActions = {
  createTask: (
    storyId: TTask["story_id"],
    title: TTask["title"],
    description: TTask["description"],
    estimation?: TTask["estimation"],
    assignee_id?: TTask["assignee_id"],
    status?: TTask["status"],
  ) => Promise<TTask["id"] | null>;
  updateTask: (
    taskId: TTask["id"],
    title: TTask["title"],
    description: TTask["description"],
    estimation?: TTask["estimation"],
    assignee_id?: TTask["assignee_id"],
    status?: TTask["status"],
  ) => Promise<TTask["id"] | null>;
  deleteTask: (taskId: TTask["id"]) => Promise<void>;
};

export const useTasksStore = defineStore<
  "tasks",
  TasksState,
  TasksGetters,
  TasksActions
>("tasks", {
  state: () => ({
    loadingState: "idle",
  }),

  getters: {
    currentProjectTasks() {
      const currentProjectStore = useCurrentProjectStore();

      if (!currentProjectStore.currentProject) {
        return [];
      }

      return currentProjectStore.currentProject.epics.reduce(
        (acc, epic) =>
          acc.concat(
            epic.stories.reduce(
              (acc, story) => acc.concat(story.tasks),
              [] as TTask[],
            ),
          ),
        [] as TTask[],
      );
    },
  },

  actions: {
    async createTask(
      storyId: TTask["story_id"],
      title: TTask["title"],
      description: TTask["description"],
      estimation?: TTask["estimation"],
      assignee_id?: TTask["assignee_id"],
      status?: TTask["status"],
    ) {
      // create a new task
      this.loadingState = "pending";
      const { setError } = useErrorsStore();

      try {
        const data = await $api<TaskPostResponse>("/api/tasks", {
          method: "POST",
          body: JSON.stringify({
            story_id: storyId,
            title,
            description,
            estimation,
            assignee_id,
            status,
          }),
        });

        if (data.statusCode !== 201) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return null;
        }

        if (data.data) {
          this.loadingState = "success";
          console.log("data: ", data);
          return data.data.id!;
        }
      } catch (error) {
        if (error) {
          this.loadingState = "error";
          setError(error as Error);
          return null;
        }
      }

      return null;
    },

    async deleteTask(taskId: TTask["id"]) {
      this.loadingState = "pending";
      const { setError } = useErrorsStore();

      try {
        const data = await $api<TaskPostResponse>(`/api/tasks/${taskId}`, {
          method: "DELETE",
        });

        if (data.statusCode !== 200) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return;
        }

        if (data.data) {
          this.loadingState = "success";
        }
      } catch (error) {
        this.loadingState = "error";
        setError(error as Error);
        return;
      }
    },

    async updateTask(
      taskId: TTask["id"],
      title: TTask["title"],
      description: TTask["description"],
      estimation?: TTask["estimation"],
      assignee_id?: TTask["assignee_id"],
      status?: TTask["status"],
    ) {
      // create a new task
      this.loadingState = "pending";

      const { setError } = useErrorsStore();

      try {
        const data = await $api<TaskPostResponse>(`/api/tasks/${taskId}`, {
          method: "PUT",
          body: JSON.stringify({
            title,
            description,
            estimation,
            assignee_id,
            status,
          }),
        });

        if (data.statusCode !== 201) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return null;
        }

        if (data.data) {
          this.loadingState = "success";
          console.log("data: ", data);
          return data.data.id!;
        }
      } catch (error) {
        this.loadingState = "error";
        setError(error as Error);
        return null;
      }

      return null;
    },
  },
});
