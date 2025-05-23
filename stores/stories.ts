import { useErrorsStore } from "@/stores/errors";
import type { StoryPostResponse } from "@/types/api";
import type { TLoadingState } from "@/types/common";
import type { TStory } from "@/types/entities";
import { defineStore } from "pinia";

type StoriesState = {
  loadingState: TLoadingState;
};

type StoriesGetters = {
  myStories: (state: StoriesState) => TStory[];
};

type StoriesActions = {
  createStory: (
    epicId: TStory["epic_id"],
    title: TStory["title"],
    description: TStory["description"],
  ) => Promise<TStory["id"] | null>;
  updateStory: (
    storyId: TStory["id"],
    title: TStory["title"],
    description: TStory["description"],
  ) => Promise<TStory["id"] | null>;
  deleteStory: (storyId: TStory["id"]) => Promise<void>;
};

export const useStoriesStore = defineStore<
  "stories",
  StoriesState,
  StoriesGetters,
  StoriesActions
>("stories", {
  state: () => ({
    loadingState: "idle",
  }),

  getters: {
    myStories() {
      return [];
    },
  },

  actions: {
    async createStory(
      epicId: TStory["epic_id"],
      title: TStory["title"],
      description: TStory["description"],
    ) {
      // create a new story
      this.loadingState = "pending";
      const { setError } = useErrorsStore();

      try {
        const data = await $api<StoryPostResponse>("/api/stories", {
          method: "POST",
          body: JSON.stringify({
            epic_id: epicId,
            title,
            description,
          }),
        });

        if (data.statusCode !== 201) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return null;
        }

        if (data.data?.id) {
          this.loadingState = "success";
          return data.data.id;
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

    async deleteStory(storyId: TStory["id"]) {
      this.loadingState = "pending";
      const { setError } = useErrorsStore();

      try {
        const data = await $api<StoryPostResponse>(`/api/stories/${storyId}`, {
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

    async updateStory(
      storyId: TStory["id"],
      title: TStory["title"],
      description: TStory["description"],
    ) {
      // create a new story
      this.loadingState = "pending";

      const { setError } = useErrorsStore();

      try {
        const data = await $api<StoryPostResponse>(`/api/stories/${storyId}`, {
          method: "PUT",
          body: JSON.stringify({
            title,
            description,
          }),
        });

        if (data.statusCode !== 201) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return null;
        }

        if (data.data?.id) {
          this.loadingState = "success";
          return data.data.id;
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
