import { defineStore } from 'pinia'

type TUser = {
  id: string,
  email: string,
  groupId: number,
}

type AuthState = {
  currentUser: TUser | null,
}

type AuthGetters = {
  isAuthorized: (state: AuthState) => boolean,
}

type AuthActions = {
  login: (email: string, password: string) => Promise<void>,
  logout: () => void,
}

export const useAuthStore = defineStore<'auth', AuthState, AuthGetters, AuthActions>('auth', {
  state: () => ({
    currentUser: {
      id: "1",
      email: "",
      groupId: 1,
    },
  }),

  getters: {
    isAuthorized(state) {
      return !!state.currentUser;
    },
  },

  actions: {
    async login(email: string, _password: string) {
      
      // Login stuff
      this.currentUser = {
        id: "1",
        email,
        groupId: 1,
      };
    },

    async logout() {
      this.currentUser = null;
    },
  }
})
