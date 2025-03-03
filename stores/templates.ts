import { defineStore } from "pinia";
import type { TTemplate } from "@/types/entities";
import type { TLoadingState } from "@/types/common";
import { useErrorsStore } from "@/stores/errors";
import type { ProjectTemplatePostResponse, ProjectTemplatePutResponse } from "~/types/api";

type TemplatesState = {
  loadingState: TLoadingState;
};

type TemplatesGetters = {
  myTemplates: (state: TemplatesState) => TTemplate[];
};

type TemplatesActions = {
  updateTemplate: (
    templateId: TTemplate["id"],
    title: TTemplate["title"],
    description: TTemplate["description"],
  ) => Promise<TTemplate["id"] | null>;
  deleteTemplate: (templateId: TTemplate["id"]) => Promise<void>;
};

export const useTemplatesStore = defineStore<
  "templates",
  TemplatesState,
  TemplatesGetters,
  TemplatesActions
>("templates", {
  state: () => ({
    loadingState: "idle",
  }),

  getters: {
    myTemplates() {
      return [];
    },
  },

  actions: {
    async deleteTemplate(templateId: TTemplate["id"]) {
      this.loadingState = "pending";
      const { setError } = useErrorsStore();

      try {
        const data = await $api<ProjectTemplatePostResponse>(`/api/projects/templates/${templateId}`, {
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

    async updateTemplate(
      templateId: TTemplate["id"],
      title: TTemplate["title"],
      description: TTemplate["description"],
    ) {
      // create a new template
      this.loadingState = "pending";

      const { setError } = useErrorsStore();

      try {
        const data = await $api<ProjectTemplatePutResponse>(`/api/templates/${templateId}`, {
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
