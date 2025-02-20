import { defineStore } from "pinia";
import type { TUser } from "@/types/entities";
import type { LoginPostResponse } from "@/types/api";

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
  jwtToken: (state: AuthState) => string | null;
};

type AuthActions = {
  login: (appInitData: string) => Promise<void>;
  logout: () => void;
};

const getInitialAuthState = (): AuthState => {
  const jwt = useCookie("jwt", { watch: false });

  if (jwt.value) {
    const jwtData = jwt ? JSON.parse(atob(jwt.value.split(".")[1])) : null;

    if (jwtData) {
      return {
        currentUser: jwtData.user,
        chatId: jwtData.chatId,
        token: jwt.value,
      };
    }

    return {
      currentUser: null,
      chatId: 0,
      token: null,
    };
  }

  return {
    currentUser: null,
    chatId: 0,
    token: null,
  };
};

export const useAuthStore = defineStore<
  "auth",
  AuthState,
  AuthGetters,
  AuthActions
>("auth", {
  state: () => getInitialAuthState(),

  getters: {
    isAuthorized(state) {
      return !!state.currentUser;
    },
    jwtToken(state) {
      return state.token;
    },
  },

  actions: {
    async login(appInitData: string) {
      try {
        const params = new URLSearchParams(appInitData);

        const data = await $api<LoginPostResponse>("/api/login", {
          method: "POST",
          body: JSON.stringify({
            params: params.get("tgWebAppData"),
          }),
        });

        if (data.data) {
          this.currentUser = data.data.user;
          this.token = data.data.token;
          this.chatId = data.data.chat_id;

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

      await $api<LoginPostResponse>("/api/logout");
    },
  },
});
