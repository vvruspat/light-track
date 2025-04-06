<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref<boolean>(true);
const { taskId, projectId, epicId } = useRoute().params;

const currentProjectStore = useCurrentProjectStore();
const taskStore = useTasksStore();

const isRemoveAlertOpen = ref(false);

const onRemoveClick = () => {
  isRemoveAlertOpen.value = true;
};

const onRemoveDialogClose = async (isConfirmed: boolean) => {
  if (isConfirmed === true) {
    await taskStore.deleteTask(Number(taskId));
    await currentProjectStore.getProjectById(Number(projectId), true);
    isRemoveAlertOpen.value = false;
    onModalClose();
  } else {
    isRemoveAlertOpen.value = false;
  }
};

const onModalClose = async () => {
  await currentProjectStore.getProjectById(Number(projectId), true);
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
        <StackContainer justify="between" align-items="center">
          <div id="tabbar-header-title" />

          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="onModalClose"
          />
        </StackContainer>
      </template>

      <template #footer>
        <div class="flex justify-between lg:justify-start gap-4">
          <UButton icon="mdi:arrow-left-thin" @click="onModalClose">
            Back
          </UButton>
          <UButton
            v-if="taskId"
            color="red"
            variant="outline"
            @click="onRemoveClick"
          >
            Delete task
          </UButton>
        </div>
      </template>

      <div class="overflow-y-scroll">
        <TaskView />
      </div>

      <RemoveDialog
        v-model="isRemoveAlertOpen"
        title="Delete confirmation."
        description="Are you sure you want to delete this task?"
        @close="onRemoveDialogClose"
      />
    </UCard>
  </UModal>
</template>
