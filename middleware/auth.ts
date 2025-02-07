import { retrieveLaunchParams } from "@telegram-apps/sdk";

export default defineNuxtRouteMiddleware((_to, _from) => {
  const route = useRoute();

  console.log("Token: ", route.query.token);

  const { initDataRaw, initData } = retrieveLaunchParams();

  console.log("mw: initDataRaw: ", initDataRaw);
  console.log("mw: initData: ", initData);

  // const user = useSupabaseUser();

  // if (!user.value) {
  //   return navigateTo('/login');
  // }
});
