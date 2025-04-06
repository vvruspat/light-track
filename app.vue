<template>
  <NuxtLoadingIndicator />
  <!-- <NuxtErrorBoundary>
    <template #error="{ error }">
      <UContainer class="p-8 h-full flex flex-col items-center justify-center">
        <UAlert
          variant="outline"
          color="red"
          :description="`An error occurred: ${error.value}, ${console.log(error)}`"
        />
      </UContainer>
    </template> -->
    <NuxtLayout name="main">
      <NuxtPage />
    </NuxtLayout>
  <!-- </NuxtErrorBoundary> -->
</template>
