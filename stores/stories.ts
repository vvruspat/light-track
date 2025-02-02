import { defineStore } from "pinia";
import type { TStory } from "@/types/entities";
import type { StoryPostResponse } from "@/types/api";
import type { TLoadingState } from "@/types/common";
import { useErrorsStore } from "@/stores/errors";

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
        const data = await $fetch<StoryPostResponse>("/api/stories", {
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

    async deleteStory(storyId: TStory["id"]) {
      this.loadingState = "pending";
      const { setError } = useErrorsStore();

      try {
        const data = await $fetch<StoryPostResponse>("/api/stories", {
          method: "DELETE",
          query: {
            storyId,
          },
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
        const data = await $fetch<StoryPostResponse>("/api/stories", {
          method: "PUT",
          body: JSON.stringify({
            story_id: storyId,
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
