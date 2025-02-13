export function $api<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1],
) {
  const auth = useAuthStore();

  return $fetch<T>(request, {
    ...opts,
    headers: {
      Authorization: auth.isAuthorized ? `${auth.jwtToken}` : "",
      ...opts?.headers,
    },
  });
}

export default $api;
