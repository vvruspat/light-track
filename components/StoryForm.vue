<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { storyId, projectId, epicId } = useRoute().params;

const storiesStore = useStoriesStore();
const currentProjectStore = useCurrentProjectStore();

const story = storyId
  ? currentProjectStore.currentProject?.epics
      .find((epic) => epic.id === Number(epicId))
      ?.stories.find((story) => story.id === Number(storyId))
  : null;

const router = useRouter();

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  title: story?.title ?? "Untitled Project",
  description: story?.description ?? "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (storyId) {
    await storiesStore.updateStory(
      Number(storyId),
      event.data.title,
      event.data.description ?? "",
    );
  } else {
    await storiesStore.createStory(
      Number(epicId),
      event.data.title,
      event.data.description ?? "",
    );
  }

  router.push(`/project/${projectId}/epic/${epicId}`);
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" autoresize />
    </UFormGroup>

    <UInput type="hidden" name="storyId" :value="storyId" />

    <StackContainer direction="row" spacing="4">
      <UButton type="submit">
        <span v-if="storyId">Update story</span>
        <span v-else>Create story</span>
      </UButton>

      <UButton variant="ghost" :to="`/project/${projectId}/epic/${epicId}`">
        Cancel
      </UButton>
    </StackContainer>
  </UForm>
</template>
