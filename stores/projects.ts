import { defineStore } from "pinia";
import type { TFullProject, TProject } from "@/types/entities";
import type {
  ProjectGetByIdResponse,
  ProjectGetResponse,
  ProjectPostResponse,
} from "@/types/api";
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
  fetchProjects: (groupId: TProject["group_id"]) => Promise<TProject[]>;
  createProject: (
    groupId: TProject["group_id"],
    title: TProject["title"],
    description: TProject["description"],
  ) => Promise<TProject | null>;
  updateProject: (
    projectId: TProject["id"],
    title: TProject["title"],
    description: TProject["description"],
  ) => Promise<TProject | null>;
  deleteProject: (projectId: TProject["id"]) => Promise<void>;
  getProjectById: (projectId: TProject["id"]) => Promise<TFullProject | null>;
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
    async fetchProjects(groupId: number) {
      // fetch all projects
      this.loadingState = "pending";

      const { data, error } = await useFetch<ProjectGetResponse>(
        "/api/projects",
        {
          method: "GET",
          query: {
            groupId,
            limit: this.limit,
            offset: this.offset,
          },
        },
      );
      const { setError } = useErrorsStore();

      if (error) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage ?? error.value?.message));
        return [];
      }

      if (data.value?.statusCode !== 200) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage));
        return [];
      }

      if (data.value?.data) {
        this.loadingState = "success";
        this.projects = data.value.data;

        return data.value.data;
      }

      return [];
    },

    async createProject(
      groupId: TProject["group_id"],
      title: TProject["title"],
      description: TProject["description"],
    ) {
      // create a new project
      this.loadingState = "pending";

      const { data, error } = await useFetch<ProjectPostResponse>(
        "/api/projects",
        {
          method: "POST",
          body: JSON.stringify({
            group_id: groupId,
            title,
            description,
          }),
        },
      );
      const { setError } = useErrorsStore();

      if (error) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage ?? error.value?.message));
        return null;
      }

      if (data.value?.statusCode !== 201) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage));
        return null;
      }

      if (data.value?.data) {
        this.loadingState = "success";
        this.projects = [...this.projects, data.value.data];

        return data.value.data;
      }

      return null;
    },

    async deleteProject(projectId: TProject["id"]) {
      this.loadingState = "pending";

      const { data, error } = await useFetch<ProjectPostResponse>(
        "/api/projects",
        {
          method: "DELETE",
          query: {
            projectId,
          },
        },
      );
      const { setError } = useErrorsStore();

      if (error) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage ?? error.value?.message));
        return;
      }

      if (data.value?.statusCode !== 200) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage));
        return;
      }

      if (data.value?.data) {
        this.loadingState = "success";
        this.projects = this.projects.filter(
          (project) => project.id !== projectId,
        );
      }
    },

    async updateProject(
      projectId: TProject["id"],
      title: TProject["title"],
      description: TProject["description"],
    ) {
      // create a new project
      this.loadingState = "pending";

      const { data, error } = await useFetch<ProjectPostResponse>(
        "/api/projects",
        {
          method: "PUT",
          body: JSON.stringify({
            project_id: projectId,
            title,
            description,
          }),
        },
      );
      const { setError } = useErrorsStore();

      if (error) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage ?? error.value?.message));
        return null;
      }

      if (data.value?.statusCode !== 201) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage));
        return null;
      }

      if (data.value?.data) {
        const updatedProject = data.value.data;

        this.loadingState = "success";
        this.projects = this.projects.map((project) => {
          if (project.id === projectId) {
            return updatedProject;
          }
          return project;
        });
      }
      return null;
    },

    async getProjectById(projectId: TProject["id"]) {
      this.loadingState = "pending";

      const { data, error } = await useFetch<ProjectGetByIdResponse>(
        "/api/projects",
        {
          method: "GET",
          query: {
            projectId,
          },
        },
      );
      const { setError } = useErrorsStore();

      if (error) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage ?? error.value?.message));
        return null;
      }

      if (data.value?.statusCode !== 200) {
        this.loadingState = "error";
        setError(new Error(data.value?.statusMessage));
        return null;
      }

      if (data.value?.data) {
        this.loadingState = "success";
        return data.value.data;
      }

      return null;
    },
  },
});
