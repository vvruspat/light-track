import { retrieveLaunchParams } from "@telegram-apps/bridge";

export default defineNuxtRouteMiddleware((to, _from) => {
  // const authStore = useAuthStore();
  if (import.meta.client && to.path === "/login") {
    const launchParams = retrieveLaunchParams();

    console.log("launchParams", launchParams);


  }
});
