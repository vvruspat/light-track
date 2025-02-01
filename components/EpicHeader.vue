<script setup lang="ts">
import { useRoute } from "vue-router";

const router = useRoute();
const { projectId, epicId } = router.params;

const currentProjectStore = useCurrentProjectStore();
const { currentProject } = storeToRefs(currentProjectStore);

const epic = computed(() =>
  currentProject.value?.epics.find((epic) => epic.id === Number(epicId)),
);
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
        {{ epic?.title }}
      </h2>
      <EpicsSelector />
    </StackContainer>

    <EpicMenu :project-id="Number(projectId)" :epic-id="Number(epicId)" />
  </StackContainer>
</template>
