<script setup lang="ts">
import type { UButton } from "#components";

type TaskButtonProps = {
  storyId: number;
};

const statuses: Array<keyof typeof statusColors> = [
  "open",
  "progress",
  "done",
  "rejected",
];
const statusColors: {
  [key in "open" | "progress" | "done" | "rejected"]: (typeof UButton)["color"];
} = {
  open: "gray",
  progress: "yellow",
  done: "green",
  rejected: "red",
};

const status = ref(
  statusColors[statuses[Math.floor(Math.random() * statuses.length)]],
);
const src =
  "https://picsum.photos/600/800?random=" + Math.round(Math.random() * 100);
const { projectId, epicId } = useRoute().params;
const { storyId } = defineProps<TaskButtonProps>();
const taskId = Math.round(Math.random() * 100000000);
const url = computed(
  () => `/project/${projectId}/epic/${epicId}/story/${storyId}/task/${taskId}`,
);
</script>

<template>
  <UButton
    :color="status"
    variant="soft"
    :to="url"
    :ui="{ rounded: 'rounded-none' }"
    class="flex-1"
  >
    <StackContainer spacing="2">
      <UAvatar size="2xs" :src="src" alt="Avatar" />
      <div class="whitespace-nowrap">Task View {{ taskId }}</div>
    </StackContainer>
  </UButton>
</template>
