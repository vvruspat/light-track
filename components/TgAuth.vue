<script lang="ts" setup>
import { retrieveRawLaunchParams } from "@telegram-apps/sdk";
const launchParams = retrieveRawLaunchParams();
const authStore = useAuthStore();

if (launchParams) {
  authStore.login(launchParams);
}
</script>

<template>
  <StackContainer direction="row" align-items="center" spacing="4">
    <UIcon name="svg-spinners:pulse-multiple" class="w-8 h-8" />
    <div>Authenticating...</div>
  </StackContainer>
</template>
