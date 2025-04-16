import { useErrorsStore } from "@/stores/errors";
import type { UsersGetResponse } from "@/types/api";
import type { TLoadingState } from "@/types/common";
import type { TUser } from "@/types/entities";
import { defineStore } from "pinia";

type UsersState = {
  loadingState: TLoadingState;
  users: TUser[];
};

type UsersGetters = {
  currentChatUsers: (state: UsersState) => TUser[];
};

type UsersActions = {
  fetchUsers: () => Promise<void>;
};

export const useUsersStore = defineStore<
  "users",
  UsersState,
  UsersGetters,
  UsersActions
>("users", {
  state: () => ({
    loadingState: "idle",
    users: [],
  }),

  getters: {
    currentChatUsers() {
      return this.users;
    },
  },

  actions: {
    async fetchUsers() {
      // create a new task
      this.loadingState = "pending";
      const { setError } = useErrorsStore();

      try {
        const data = await $api<UsersGetResponse>("/api/users", {
          method: "GET",
        });

        if (data.statusCode !== 200) {
          this.loadingState = "error";
          throw Error(data.statusMessage);
        }

        if (data.data) {
          this.loadingState = "success";
          this.users = data.data;
          return;
        }
      } catch (error) {
        if (error) {
          this.loadingState = "error";
          setError(error as Error);
          return;
        }
      }

      return;
    },
  },
});
