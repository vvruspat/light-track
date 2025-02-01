<script setup lang="ts">
import { ref } from "vue";

const currentProjectStore = useCurrentProjectStore();
const { currentProject } = storeToRefs(currentProjectStore);

const router = useRoute();
const { projectId } = router.params;

const links = computed(() => currentProject.value?.epics.map((epic) => ({ to: `/project/${projectId}/epic/${epic.id}`, label: epic.title })) ?? []);

const isOpen = ref(false);
</script>

<template>
  <UPopover>
    <UButton
      icon="mdi:chevron-down"
      size="sm"
      color="gray"
      square
      variant="ghost"
      @click="isOpen = true"
    />
    <template #panel>
      <UVerticalNavigation :links="links" />
    </template>
  </UPopover>
</template>
