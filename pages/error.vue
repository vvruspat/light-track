<script lang="ts" setup>
const errorsStore = useErrorsStore();
const error = errorsStore.currentError?.message ?? "Unknown Error";
</script>

<template>
  <UCard class="h-full flex items-center justify-center">
    {{ error ?? "Unknown Error" }}
  </UCard>
</template>
