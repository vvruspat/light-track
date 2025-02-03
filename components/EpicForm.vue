<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

type ProjectEditFormProps = {
  title?: string;
  description?: string;
};

const { title, description } = defineProps<ProjectEditFormProps>();
const { epicId, projectId } = useRoute().params;
const router = useRouter();

const epicsStore = useEpicsStore();
const currentProjectStore = useCurrentProjectStore();

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  title: title ?? "Untitled Epic",
  description: description ?? "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  let id = epicId ? Number(epicId) : null;
  if (epicId) {
    id = await epicsStore.updateEpic(
      Number(epicId),
      event.data.title,
      event.data.description ?? "",
    );
  } else {
    id = await epicsStore.createEpic(
      Number(projectId),
      event.data.title,
      event.data.description ?? "",
    );
  }

  await currentProjectStore.getProjectById(Number(projectId), true);

  router.push(`/project/${projectId}/epic/${id}`);
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
