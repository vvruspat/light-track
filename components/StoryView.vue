<script setup lang="ts">
import TaskButton from "@/components/TaskButton.vue";
import type { TFullStory } from "~/types/entities";

type StoryViewProps = {
  story: TFullStory;
  projectId: number;
};

const { story, projectId } = defineProps<StoryViewProps>();

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
        <h3>{{ story.title }}</h3>
        <StoryMenu
          :story-id="story.id"
          :project-id="projectId"
          :epic-id="story.epic_id"
        />
      </StackContainer>
    </template>

    <StackContainer
      v-if="story.tasks.length > 0"
      direction="row"
      class="w-full"
      wrap="wrap"
      spacing="1"
    >
      <TaskButton v-for="task in story.tasks" :key="task.id" :task="task" />
    </StackContainer>

    <StackContainer
      v-else
      direction="row"
      align-items="center"
      class="w-full"
      wrap="wrap"
      spacing="4"
    >
      <div>You haven't made any task yet for this story.</div>
      <UButton
        :to="`/project/${projectId}/epic/${story.epic_id}/story/${story.id}/task/create`"
      >
        Create task
      </UButton>
    </StackContainer>

    <template v-if="story.description" #footer>
      <UAccordion
        color="sky"
        variant="link"
        size="sm"
        :items="[
          {
            label: 'Description',
            content: story.description,
          },
        ]"
      />
    </template>
  </UCard>
</template>
