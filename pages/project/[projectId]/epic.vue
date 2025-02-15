<script setup lang="ts">
const { epicId, projectId } = useRoute().params;
</script>

<template>
  <div>
    <NuxtPage />

    <UCard v-if="!epicId" class="w-full h-full">
      <StackContainer
        direction="column"
        align-items="center"
        justify="center"
        spacing="4"
        class="w-full h-full"
      >
        <div>You haven't made any epic yet for this project.</div>
        <UButton :to="`/project/${projectId}/epic/create`">Create epic</UButton>
      </StackContainer>
    </UCard>
  </div>
</template>
