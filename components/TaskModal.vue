<script setup lang="ts">
import { ref, watch } from "vue";
const isOpen = ref<boolean>(true);
const router = useRouter();
const { taskId, epicId, projectId } = useRoute().params;

const epicUrl = computed(() => `/project/${projectId}/epic/${epicId}`);

watch(isOpen, (isOpenNew) => {
  if (!isOpenNew) {
    router.push(epicUrl.value);
  }
});

const isRemoveAlertOpen = ref(false);

const onRemoveClick = () => {
  isRemoveAlertOpen.value = true;
};

const onRemoveDialogClose = (isConfirmed: boolean) => {
  if (isConfirmed === true) {
    console.log("Epic removed");
    isOpen.value = false;
    isRemoveAlertOpen.value = false;
  } else {
    isRemoveAlertOpen.value = false;
  }
};
</script>

<template>
  <UModal v-model="isOpen" fullscreen prevent-close>
    <UCard
      :ui="{
        base: 'h-full max-h-full flex flex-col',
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
            @click="isOpen = false"
          />
        </StackContainer>
      </template>

      <template #footer>
        <div class="flex justify-between lg:justify-start gap-4">
          <UButton icon="mdi:arrow-left-thin" @click="isOpen = false">
            Back
          </UButton >
          <UButton v-if="taskId" color="red" variant="outline" @click="onRemoveClick">
            Delete task
          </UButton>
        </div>
      </template>

      <div class="overflow-y-scroll">
        <slot />
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
