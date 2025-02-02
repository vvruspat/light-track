<script setup lang="ts">
import StoryView from "@/components/StoryView.vue";

const { projectId, epicId } = useRoute().params;
const currentProjectStore = useCurrentProjectStore();
const { currentProject } = storeToRefs(currentProjectStore);

const stories = computed(() => {
  return currentProject.value?.epics.find((epic) => epic.id === Number(epicId))
    ?.stories;
});
</script>

<template>
  <div class="w-full h-full max-h-full">
    <StackContainer
      direction="column"
      justify="stretch"
      class="w-full h-full max-h-full"
    >
      <div class="my-4 w-full">
        <UAccordion
          v-if="currentProject?.epics[Number(epicId)]?.description"
          color="gray"
          variant="ghost"
          size="sm"
          :items="[
            {
              label: 'Description',
              content: currentProject?.epics[Number(epicId)].description,
            },
          ]"
        />
      </div>
      <div v-if="stories && stories.length > 0" class="w-full h-full">
        <StackContainer direction="column" align-items="stretch" spacing="4">
          <StoryView
            v-for="story in stories"
            :key="story.id"
            :story="story"
            :project-id="Number(projectId)"
          />
        </StackContainer>
      </div>
      <UCard v-else class="w-full h-full">
        <StackContainer
          direction="column"
          align-items="center"
          justify="center"
          spacing="4"
          class="w-full h-full"
        >
          <div>You haven't made any story yet for this epic.</div>
          <UButton :to="`/project/${projectId}/epic/${epicId}/story/create`"
            >Create story</UButton
          >
        </StackContainer>
      </UCard>
    </StackContainer>
  </div>
</template>
