<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref<boolean>(true);
const { projectId, epicId } = useRoute().params;

const currentProjectStore = useCurrentProjectStore();

const onModalClose = async () => {
  await currentProjectStore.getProjectById(Number(projectId), true);
  isOpen.value = false;
  await navigateTo(`/project/${projectId}/epic/${epicId}`);
};
</script>

<template>
  <UModal v-model="isOpen" fullscreen :prevent-close="true">
    <UCard
      :ui="{
        base: 'h-full flex flex-col overflow-scroll',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow',
        },
      }"
    >
      <template #header>
        <StackContainer justify="end" align-items="center">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="onModalClose"
          />
        </StackContainer>
      </template>

      <div class="overflow-y-scroll">
        <TaskForm />
      </div>
    </UCard>
  </UModal>
</template>
