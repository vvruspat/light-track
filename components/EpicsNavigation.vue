<script setup lang="ts">
import { useRoute } from "vue-router";

interface UCarouselInstance {
  next: () => void;
  prev: () => void;
  select: (index: number) => void;
  page: number;
}

const items = [
  {
    id: "1",
    title: "Epic 1",
  },
  {
    id: "2",
    title: "Epic 2",
  },
  {
    id: "3",
    title: "Epic 3",
  },
  {
    id: "4",
    title: "Epic 4 hklhjhlglkhkjgjhjg",
  },
  {
    id: "5",
    title: "Epic 5",
  },
  {
    id: "6",
    title: "Epic 6",
  },
  {
    id: "7",
    title: "Epic 7",
  },
  {
    id: "8",
    title: "Epic 8",
  },
  {
    id: "9",
    title: "Epic 9",
  },
  {
    id: "10",
    title: "Epic 10",
  },
];

const router = useRoute();
const { projectId, epicId } = router.params;

const currentIndex = computed(() => epicId ? items.findIndex((item) => item.id === epicId) : 0);

const disabledPrev = computed(() => currentIndex.value === 0);
const disabledNext = computed(() => currentIndex.value === items.length - 1);

const nextUrl = computed(() => `/project/${projectId}/epic/${items[currentIndex.value + 1]?.id}`);
const prevUrl = computed(() => `/project/${projectId}/epic/${items[currentIndex.value - 1]?.id}`);

</script>

<template>
  <Stack
    direction="row"
    spacing="4"
    justify="center"
    alignItems="center"
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
  </Stack>
</template>
