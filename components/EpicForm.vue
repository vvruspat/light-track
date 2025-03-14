<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { epicId, projectId } = useRoute().params;

const epicsStore = useEpicsStore();
const currentProjectStore = useCurrentProjectStore();

const epic = computed(() =>
  currentProjectStore.currentProject?.epics.find(
    (epic) => epic.id === Number(epicId),
  ),
);

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  title: epic.value?.title ?? "Untitled Epic",
  description: epic.value?.description ?? "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault();

  let id = epicId ? Number(epicId) : null;
  if (epicId) {
    await epicsStore.updateEpic(
      Number(epicId),
      event.data.title,
      event.data.description ?? "",
    );
  } else {
    const newEpicId = await epicsStore.createEpic(
      Number(projectId),
      event.data.title,
      event.data.description ?? "",
    );

    if (newEpicId) {
      id = newEpicId;
    }
  }

  await currentProjectStore.getProjectById(Number(projectId), true);

  await navigateTo(`/project/${projectId}/epic/${id}`);
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

    <UInput type="hidden" name="epicId" :value="epicId" />

    <StackContainer direction="row" spacing="4">
      <UButton type="submit">
        <span v-if="epicId">Update epic</span>
        <span v-else>Create epic</span>
      </UButton>

      <UButton
        v-if="epicId"
        variant="ghost"
        :to="`/project/${projectId}/epic/${epicId}`"
      >
        Cancel
      </UButton>
      <UButton v-else variant="ghost" :to="`/project/${projectId}/epic`">
        Cancel
      </UButton>
    </StackContainer>
  </UForm>
</template>
