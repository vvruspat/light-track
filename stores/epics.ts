import { defineStore } from "pinia";
import type { TEpic } from "@/types/entities";
import type { EpicPostResponse, EpicPutResponse } from "@/types/api";
import type { TLoadingState } from "@/types/common";
import { useErrorsStore } from "@/stores/errors";

type EpicsState = {
  loadingState: TLoadingState;
};

type EpicsGetters = {
  myEpics: (state: EpicsState) => TEpic[];
};

type EpicsActions = {
  createEpic: (
    projectId: TEpic["project_id"],
    title: TEpic["title"],
    description: TEpic["description"],
  ) => Promise<TEpic["id"] | null>;
  updateEpic: (
    epicId: TEpic["id"],
    title: TEpic["title"],
    description: TEpic["description"],
  ) => Promise<TEpic["id"] | null>;
  deleteEpic: (epicId: TEpic["id"]) => Promise<void>;
};

export const useEpicsStore = defineStore<
  "epics",
  EpicsState,
  EpicsGetters,
  EpicsActions
>("epics", {
  state: () => ({
    loadingState: "idle",
  }),

  getters: {
    myEpics() {
      return [];
    },
  },

  actions: {
    async createEpic(
      projectId: TEpic["project_id"],
      title: TEpic["title"],
      description: TEpic["description"],
    ) {
      // create a new epic
      this.loadingState = "pending";
      const { setError } = useErrorsStore();

      try {
        const data = await $api<EpicPostResponse>("/api/epics", {
          method: "POST",
          body: JSON.stringify({
            project_id: projectId,
            title,
            description,
          }),
        });

        if (data.statusCode !== 201) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return null;
        }

        if (data.data) {
          this.loadingState = "success";
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

    async deleteEpic(epicId: TEpic["id"]) {
      this.loadingState = "pending";
      const { setError } = useErrorsStore();

      try {
        const data = await $api<EpicPostResponse>(`/api/epics/${epicId}`, {
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

    async updateEpic(
      epicId: TEpic["id"],
      title: TEpic["title"],
      description: TEpic["description"],
    ) {
      // create a new epic
      this.loadingState = "pending";

      const { setError } = useErrorsStore();

      try {
        const data = await $api<EpicPutResponse>(`/api/epics/${epicId}`, {
          method: "PUT",
          body: JSON.stringify({
            title,
            description,
          }),
        });

        if (data.statusCode !== 200) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return null;
        }

        if (data.data) {
          this.loadingState = "success";
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
