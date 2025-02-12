import { defineStore } from "pinia";
import type { TUser } from "@/types/entities";
import type { LoginPostResponse } from "~/types/api";

export type TAppData = {
  auth_date: string;
  chat_instance: string;
  chat_type: string;
  hash: string;
  signature: string;
  user: TUser;
};

type AuthState = {
  currentUser: TUser | null;
  chatId: number;
  token: string | null;
};

type AuthGetters = {
  isAuthorized: (state: AuthState) => boolean;
};

type AuthActions = {
  login: (appInitData: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = defineStore<
  "auth",
  AuthState,
  AuthGetters,
  AuthActions
>("auth", {
  state: () => ({
    currentUser: null,
    chatId: 0,
    token: null,
  }),

  getters: {
    isAuthorized(state) {
      return !!state.currentUser;
    },
  },

  actions: {
    async login(appInitData: string) {
      try {
        const params = new URLSearchParams(appInitData);

        const data = await $fetch<LoginPostResponse>("/api/login", {
          method: "POST",
          body: JSON.stringify({
            params: params.get("tgWebAppData"),
          }),
        });

        console.log("data: ", data);

        if (data.data) {
          this.currentUser = data.data.user;

          console.log("this.currentUser: ", this.currentUser);

          await navigateTo("/dashboard");
        }
      } catch (error) {
        console.error(error);
        await navigateTo("/error");
      }
    },

    async logout() {
      this.currentUser = null;
      this.token = null;
      this.chatId = 0;
    },
  },
});
