<script setup lang="ts">
import { ref, watch } from "vue";
const isOpen = ref<boolean>(true);
const router = useRouter();
const { storyId, epicId, projectId } = useRoute().params;

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
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            <div v-if="storyId">Update story</div>
            <div v-else>Create new story</div>
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

      <slot />
    </UCard>
  </UModal>
</template>
