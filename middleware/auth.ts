import { retrieveLaunchParams } from "@telegram-apps/bridge";

export default defineNuxtRouteMiddleware((to, _from) => {
  if (import.meta.client && to.path === "/login") {
    const launchParams = retrieveLaunchParams();

    console.log("launchParams", launchParams);

    if (launchParams.tgWebAppData && launchParams.tgWebAppData.user) {
      const authStore = useAuthStore();

      authStore.login(launchParams);
    }
  }
});
