<script setup lang="ts">
import type { UButton } from "#components";
import type { TTask } from "~/types/entities";

type TaskButtonProps = {
  task: TTask;
};

const statusColors: {
  [key in
    | "todo"
    | "progress"
    | "done"
    | "rejected"]: (typeof UButton)["color"];
} = {
  todo: "gray",
  "progress": "yellow",
  done: "green",
  rejected: "red",
};

const status = computed(
  () => statusColors[task.status as keyof typeof statusColors],
);
const src =
  "https://picsum.photos/600/800?random=" + Math.round(Math.random() * 100);
const { projectId, epicId } = useRoute().params;
const { task } = defineProps<TaskButtonProps>();
const url = computed(
  () =>
    `/project/${projectId}/epic/${epicId}/story/${task.story_id}/task/${task.id}`,
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
      <div class="whitespace-nowrap">{{ task.title }}</div>
    </StackContainer>
  </UButton>
</template>
