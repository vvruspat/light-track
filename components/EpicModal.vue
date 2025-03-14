<script setup lang="ts">
import { ref, watch } from "vue";
const isOpen = ref<boolean>(true);
const route = useRoute();
const { epicId, projectId } = route.params;
const { emptyProject } = route.query;

watch(isOpen, async (isOpenNew) => {
  if (!isOpenNew) {
    await navigateTo(`/project/${projectId}/epic/${epicId}`);
  }
});
</script>

<template>
  <UModal v-model="isOpen" fullscreen>
    <UCard
      :ui="{
        base: 'h-full flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            v-if="emptyProject"
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Create your first epic
          </h3>
          <h3
            v-else-if="epicId"
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Update epic
          </h3>
          <h3
            v-else
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Create new epic
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <UAlert
        v-if="emptyProject"
        variant="outline"
        color="yellow"
        class="mb-4"
        :ui="{ base: 'w-full' }"
        description="This project is empty. Create your first epic to start working on it."
      />

      <slot />
    </UCard>
  </UModal>
</template>
