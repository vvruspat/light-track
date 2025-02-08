import { retrieveLaunchParams } from '@telegram-apps/bridge';

export default defineNuxtRouteMiddleware((to, _from) => {
  console.log("to", to);
  if (import.meta.client && to.path === "/login") {

    const launchParams = retrieveLaunchParams();
    // const hash = to.hash?.slice(1);
    // const params = new URLSearchParams(hash);
    
    console.log("launchParams", launchParams); 
  }
});
