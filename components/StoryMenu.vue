<script setup lang="ts">
import { ref } from "vue";

type StoryMenuProps = {
  projectId: number;
  epicId: number;
  storyId: number;
};

const { storyId, projectId, epicId } = defineProps<StoryMenuProps>();
const isRemoveAlertOpen = ref(false);
const isOpen = ref(false);

const storiesStore = useStoriesStore();
const currentProjectStore = useCurrentProjectStore();

const links = [
  [
    {
      label: "Edit story",
      icon: "i-heroicons-question-mark-circle",
      to: `/project/${projectId}/epic/${epicId}/story/${storyId}/edit`,
    },
    {
      label: "Remove story",
      icon: "i-heroicons-question-mark-circle",
      click: () => {
        isRemoveAlertOpen.value = true;
      },
    },
  ],
];

const createTaskUrl = `/project/${projectId}/epic/${epicId}/story/${storyId}/task/create`;

const onRemoveDialogClose = async (isConfirmed: boolean) => {
  if (isConfirmed) {
    await storiesStore.deleteStory(storyId);
    await currentProjectStore.getProjectById(projectId, true);
  }
  isRemoveAlertOpen.value = false;
};
</script>

<template>
  <UPopover>
    <UButton
      icon="mdi:dots-vertical"
      size="sm"
      color="gray"
      square
      variant="ghost"
      @click="isOpen = true"
    />
    <template #panel>
      <UContainer class="p-4">
        <StackContainer direction="column">
          <UButton :to="createTaskUrl">Create new task</UButton>

          <UVerticalNavigation :links="links" />
        </StackContainer>
      </UContainer>
    </template>
  </UPopover>
  <RemoveDialog
    v-model="isRemoveAlertOpen"
    title="Delete confirmation."
    description="Are you sure you want to delete this story?"
    @close="onRemoveDialogClose"
  />
</template>
