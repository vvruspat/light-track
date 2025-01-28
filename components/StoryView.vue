<script setup lang="ts">
import TaskButton from "@/components/TaskButton.vue";

type StoryViewProps = {
  storyId: number;
  epicId: number;
  projectId: number;
};

const { storyId, epicId, projectId } = defineProps<StoryViewProps>();

const cardConfig = {
  header: {
    padding: "py-2",
  },
  footer: {
    padding: "py-2",
  },
};
</script>

<template>
  <UCard :ui="cardConfig" class="snap-center">
    <template #header>
      <StackContainer
        direction="row"
        justify="between"
        align-items="center"
        class="w-full"
      >
        <h3>Story</h3>
        <StoryMenu
          :story-id="storyId"
          :project-id="projectId"
          :epic-id="epicId"
        />
      </StackContainer>
    </template>

    <StackContainer
      direction="row"
      class="w-full"
      wrap="wrap"
      justify="stretch"
      spacing="1"
    >
      <TaskButton :story-id="storyId" />
      <TaskButton :story-id="storyId" />
      <TaskButton :story-id="storyId" />
      <TaskButton :story-id="storyId" />
      <TaskButton :story-id="storyId" />
      <TaskButton :story-id="storyId" />
      <TaskButton :story-id="storyId" />
      <TaskButton :story-id="storyId" />
      <TaskButton :story-id="storyId" />
    </StackContainer>

    <template v-if="Boolean(Math.round(Math.random()))" #footer>
      <UAccordion
        color="sky"
        variant="link"
        size="sm"
        :items="[
          {
            label: 'Description',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          },
        ]"
      />
    </template>
  </UCard>
</template>
