<script setup lang="ts">
import { useRoute } from "vue-router";

const currentProjectStore = useCurrentProjectStore();
const { currentProject } = storeToRefs(currentProjectStore);


const items = computed(() => currentProject.value?.epics.map((epic) => ({ id: epic.id, title: epic.title })) ?? []);

const router = useRoute();
const { projectId, epicId } = router.params;

const currentIndex = computed(() =>
  epicId ? items.value.findIndex((item) => item.id === Number(epicId)) : 0,
);

const disabledPrev = computed(() => currentIndex.value === 0);
const disabledNext = computed(() => currentIndex.value === items.value.length - 1);

const nextUrl = computed(
  () => `/project/${projectId}/epic/${items.value[currentIndex.value + 1]?.id}`,
);
const prevUrl = computed(
  () => `/project/${projectId}/epic/${items.value[currentIndex.value - 1]?.id}`,
);
</script>

<template>
  <StackContainer
    direction="row"
    spacing="4"
    justify="center"
    align-items="center"
    class="max-w-full"
  >
    <UButton color="gray" :disabled="disabledPrev" :to="prevUrl">
      <template #leading>
        <UIcon name="i-heroicons-arrow-left-20-solid" class="w-5 h-5" />
      </template>
    </UButton>

    <UButton color="gray" :disabled="disabledNext" :to="nextUrl">
      <template #trailing>
        <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
      </template>
    </UButton>
  </StackContainer>
</template>
