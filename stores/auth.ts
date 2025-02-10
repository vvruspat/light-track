import { defineStore } from "pinia";
import type { RetrieveLPResult } from "@telegram-apps/bridge";

// type TAppTheme = {
//   accent_text_color: string;
//   bg_color: string;
//   bottom_bar_bg_color: string;
//   button_color: string;
//   button_text_color: string;
//   destructive_text_color: string;
//   header_bg_color: string;
//   hint_color: string;
//   link_color: string;
//   secondary_bg_color: string;
//   section_bg_color: string;
//   section_header_text_color: string;
//   section_separator_color: string;
//   subtitle_text_color: string;
//   text_color: string;
// };

type TUser = {
  allows_write_to_pm: boolean;
  first_name: string;
  id: string;
  language_code: string;
  last_name: string;
  photo_url: string;
  username: string;
};

export type TAppData = {
  auth_date: string;
  chat_instance: string;
  chat_type: string;
  hash: string;
  signature: string;
  user: TUser;
};

// type TMiniAppInit = {
//   tgWebAppBotInline: boolean;
//   tgWebAppData: TAppData;
//   tgWebAppPlatform: string;
//   tgWebAppThemeParams: TAppTheme;
//   tgWebAppVersion: string;
// };

type AuthState = {
  currentUser: (TUser & { chatId: TAppData["chat_instance"] }) | null;
};

type AuthGetters = {
  isAuthorized: (state: AuthState) => boolean;
};

type AuthActions = {
  login: (appInitData: RetrieveLPResult) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = defineStore<
  "auth",
  AuthState,
  AuthGetters,
  AuthActions
>("auth", {
  state: () => ({
    currentUser: {
      id: "",
      username: "",
      first_name: "",
      last_name: "",
      language_code: "en",
      photo_url: "",
      allows_write_to_pm: true,
      chatId: "",
    },
  }),

  getters: {
    isAuthorized(state) {
      return !!state.currentUser;
    },
  },

  actions: {
    async login(appInitData: RetrieveLPResult) {
      try {
        const data = await $fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(appInitData.tgWebAppData),
        });

        console.log("data: ", data);

        if (appInitData.tgWebAppData) {
          // this.currentUser = {
          //   ...appInitData.tgWebAppData.user,
          //   chatId: appInitData.tgWebAppData.chat_instance ?? "0",
          // };

          console.log("this.currentUser: ", this.currentUser);

          navigateTo("/dashboard");
        }
      } catch (error) {
        console.error(error);
        navigateTo("/error");
      }
    },

    async logout() {
      this.currentUser = null;
    },
  },
});
