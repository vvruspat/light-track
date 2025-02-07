
export default defineNuxtRouteMiddleware((to, _from) => {
  console.log("to", to);
  if (import.meta.client && to.path === "/login") {
    
    const hash = to.hash?.slice(1);
    const params = new URLSearchParams(hash);
    console.log(params.entries());
  }
});
