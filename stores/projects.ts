import { defineStore } from "pinia";
import type { TProject } from "@/types/entities";
import type { ProjectGetResponse, ProjectPostResponse } from "@/types/api";
import type { TLoadingState } from "@/types/common";
import { useErrorsStore } from "@/stores/errors";
import { useAuthStore } from "~/stores/auth";

type ProjectsState = {
  projects: TProject[];
  loadingState: TLoadingState;
  limit: number;
  offset: number;
};

type ProjectsGetters = {
  myProjects: (state: ProjectsState) => TProject[];
};

type ProjectsActions = {
  saveAsTemplate: (projectId: TProject["id"]) => Promise<void>;
  fetchProjects: () => Promise<TProject[]>;
  createProject: (
    title: TProject["title"],
    description: TProject["description"],
  ) => Promise<TProject | null>;
  updateProject: (
    projectId: TProject["id"],
    title: TProject["title"],
    description: TProject["description"],
  ) => Promise<TProject | null>;
  deleteProject: (projectId: TProject["id"]) => Promise<void>;
};

export const useProjectsStore = defineStore<
  "projects",
  ProjectsState,
  ProjectsGetters,
  ProjectsActions
>("projects", {
  state: () => ({
    projects: [],
    limit: 50,
    offset: 0,
    loadingState: "idle",
  }),

  getters: {
    myProjects(state) {
      const { currentUser } = useAuthStore();
      if (!currentUser) {
        return [];
      }

      return state.projects.filter(
        (project) => project.owner_id === currentUser.id,
      );
    },
  },

  actions: {
    async saveAsTemplate(projectId: TProject["id"]) {
      // save project as a template
      this.loadingState = "pending";

      const { setError } = useErrorsStore();

      try {
        const data = await $api<ProjectTemplatePostResponse>(
          `/api/projects/template`,
          {
            method: "POST",
            body: JSON.stringify({
              project_id: projectId,
            }),
          },
        );

        if (data.statusCode !== 201) {
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

    async fetchProjects() {
      // fetch all projects
      this.loadingState = "pending";

      const { setError } = useErrorsStore();

      try {
        const data = await $api<ProjectGetResponse>("/api/projects", {
          method: "GET",
          query: {
            limit: this.limit,
            offset: this.offset,
          },
        });

        if (data.statusCode !== 200) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return [];
        }

        if (data.data) {
          this.loadingState = "success";
          this.projects = data.data;

          return data.data;
        }
      } catch (error) {
        this.loadingState = "error";
        setError(error as Error);
        return [];
      }

      return [];
    },

    async createProject(
      title: TProject["title"],
      description: TProject["description"],
    ) {
      // create a new project
      this.loadingState = "pending";

      const { setError } = useErrorsStore();

      try {
        const data = await $api<ProjectPostResponse>("/api/projects", {
          method: "POST",
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

        if (data.data) {
          this.loadingState = "success";
          this.projects = [...this.projects, data.data];

          return data.data;
        }
      } catch (error) {
        console.error((error as Error).message ?? "Unkbown error");
        this.loadingState = "error";
        setError(error as Error);
        return null;
      }

      return null;
    },

    async deleteProject(projectId: TProject["id"]) {
      this.loadingState = "pending";

      const { setError } = useErrorsStore();

      try {
        const data = await $api<ProjectPostResponse>(
          `/api/projects/${projectId}`,
          {
            method: "DELETE",
          },
        );

        if (data.statusCode !== 200) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return;
        }

        if (data.data) {
          this.loadingState = "success";
          this.projects = this.projects.filter(
            (project) => project.id !== projectId,
          );
        }
      } catch (error) {
        this.loadingState = "error";
        setError(error as Error);
        return;
      }
    },

    async updateProject(
      projectId: TProject["id"],
      title: TProject["title"],
      description: TProject["description"],
    ) {
      // create a new project
      this.loadingState = "pending";

      const { setError } = useErrorsStore();
      try {
        const data = await $api<ProjectPostResponse>(
          `/api/projects/${projectId}`,
          {
            method: "PUT",
            body: JSON.stringify({
              title,
              description,
            }),
          },
        );

        if (data.statusCode !== 200) {
          this.loadingState = "error";
          setError(new Error(data.statusMessage));
          return null;
        }

        if (data.data) {
          const updatedProject = data.data;

          this.loadingState = "success";
          this.projects = this.projects.map((project) => {
            if (project.id === projectId) {
              return updatedProject;
            }
            return project;
          });
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
