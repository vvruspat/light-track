export default defineNuxtRouteMiddleware((_to, _from) => {
  const route = useRoute();

  console.log("Token: ", route.query.token);

  // const user = useSupabaseUser();

  // if (!user.value) {
  //   return navigateTo('/login');
  // }
});
