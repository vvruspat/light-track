import { defineStore } from "pinia";

type ErrorsState = {
  error: Error | null;
};

type ErrorsGetters<S> = {
  currentError: (state: S) => Error | null;
};

type ErrorsActions = {
  setError: (error: Error) => void;
};

export const useErrorsStore = defineStore<
  "errors",
  ErrorsState,
  ErrorsGetters<ErrorsState>,
  ErrorsActions
>("errors", {
  state: () => ({
    error: null,
  }),

  getters: {
    currentError(state) {
      return state.error;
    },
  },

  actions: {
    setError(error: Error) {
      this.error = error;
    },
  },
});
