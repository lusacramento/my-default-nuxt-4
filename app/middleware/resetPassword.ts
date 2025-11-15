import type { AuthResponse } from "~~/types/AuthResponse";

export default defineNuxtRouteMiddleware(async (to) => {
  if (await to.query.token) {
    return navigateTo("/");
  }

  const { error } = (await $fetch(
    `/api/auth/verify-token?token=${to.query.token}`
  )) as AuthResponse;
  if (error) {
    console.error(error);
    return navigateTo("/");
  }

  return;
});
