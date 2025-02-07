import { retrieveLaunchParams } from "@telegram-apps/sdk";

export default defineNuxtRouteMiddleware((to, _from) => {
    console.log("to", to);
    if (import.meta.client && to.path === "/login") {
        const { initDataRaw, initData } = retrieveLaunchParams();

        console.log("initDataRaw", initDataRaw, initData);
    }
})
