import { defineNuxtPlugin } from "#app";
import Vue3Linkify from "vue-3-linkify";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Linkify);
});
