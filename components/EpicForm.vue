<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

type ProjectEditFormProps = {
  title?: string;
  description?: string;
};

const { title, description } = defineProps<ProjectEditFormProps>();
const { epicId, projectId } = useRoute().params;

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
  // Do something with data
  console.log(event.data);
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

    <input type="hidden" name="epicId" :value="epicId" />

    <Stack direction="row" spacing="4">
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
    </Stack>
  </UForm>
</template>
