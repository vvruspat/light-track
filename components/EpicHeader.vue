<script setup lang="ts">
import { useRoute } from "vue-router";

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

const currentIndex = computed(() =>
  epicId ? items.findIndex((item) => item.id === epicId) : 0,
);

const item = computed(() => items[currentIndex.value]);
</script>

<template>
  <StackContainer
    direction="row"
    spacing="4"
    justify="between"
    align-items="center"
    class="max-w-full"
  >
    <StackContainer
      direction="row"
      justify="start"
      align-items="center"
      class="w-full"
    >
      <h2 class="text-xl font-light">
        {{ item.title }}
      </h2>
      <EpicsSelector />
    </StackContainer>

    <EpicMenu :project-id="Number(projectId)" :epic-id="Number(epicId)" />
  </StackContainer>
</template>
