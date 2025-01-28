<script setup lang="ts">
import { ref, watch } from 'vue';
const isOpen = ref<boolean>(true);
const router = useRouter();
const { taskId, epicId, projectId } = useRoute().params; 

watch(isOpen, (isOpenNew) => {
  if (!isOpenNew) {
    router.push(`/project/${projectId}/epic/${epicId}`);
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
        <Stack justify="between" alignItems="center">
          <!-- <h2 class="text-lg font-semibold">Project: {{ projectId }}</h2> -->
          <div id="tabbar-header-title"></div>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </Stack>
      </template>

      <slot></slot>
    </UCard>
  </UModal>
</template>
