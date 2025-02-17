<template>
  <NuxtLoadingIndicator />
  <NuxtErrorBoundary>
    <template #error="{ error }">
      <UAlert
        variant="outline"
        color="red"
        :description="`An error occurred: ${error}`"
      />
    </template>
    <NuxtLayout name="main">
      <NuxtPage />
    </NuxtLayout>
  </NuxtErrorBoundary>
</template>
