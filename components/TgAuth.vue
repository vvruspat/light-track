<script lang="ts" setup>
import { retrieveRawLaunchParams } from "@telegram-apps/sdk";
const launchParams = retrieveRawLaunchParams();
const authStore = useAuthStore();

console.log("launchParams", launchParams);

if (launchParams) {
  authStore.login(launchParams);
}
</script>

<template>
  <div>Authenticating...</div>
</template>
