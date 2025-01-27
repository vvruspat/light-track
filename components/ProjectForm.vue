<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

type ProjectEditFormProps = {
  title?: string;
  description?: string;
};

const { title, description } = defineProps<ProjectEditFormProps>();
const { projectId } = useRoute().params;

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive({
  title: title ?? "Untitled Project",
  description: description ?? ""
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
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

    <input type="hidden" name="projectId" :value="projectId" />

    <Stack direction="row" spacing="4">
      <UButton type="submit">
        <span v-if="projectId">Update project</span>
        <span v-else>Create project</span>
      </UButton>

      <UButton v-if="projectId" variant="ghost" :to="`/project/${projectId}`">
        Cancel
      </UButton>
      <UButton v-else variant="ghost" to="/project">
        Cancel
      </UButton>
    </Stack>
  </UForm>
</template>
