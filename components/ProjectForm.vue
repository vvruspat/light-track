<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { projectId } = useRoute().params;
const projectsStore = useProjectsStore();
const currentProjectStore = useCurrentProjectStore();
const { currentProject: project, loadingState } =
  storeToRefs(currentProjectStore);

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  title: project.value?.title ?? "Untitled Project",
  description: project.value?.description ?? "",
});

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  if (projectId) {
    await projectsStore.updateProject(
      Number(projectId),
      state.title,
      state.description,
    );
    await currentProjectStore.getProjectById(Number(projectId), true);

    navigateTo(`/project/${projectId}`);
  } else {
    const newProject = await projectsStore.createProject(
      state.title,
      state.description,
    );

    if (newProject) {
      await currentProjectStore.getProjectById(Number(newProject.id), true);

      navigateTo(`/project/${newProject.id}`);
    }
  }
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

    <UInput type="hidden" name="projectId" :value="projectId" />

    <StackContainer direction="row" spacing="4">
      <UButton
        type="submit"
        :loading="loadingState === 'pending'"
        :disabled="loadingState === 'pending'"
      >
        <span v-if="projectId">Update project</span>
        <span v-else>Create project</span>
      </UButton>

      <UButton v-if="projectId" variant="ghost" :to="`/project/${projectId}`">
        Cancel
      </UButton>
      <UButton v-else variant="ghost" to="/project"> Cancel </UButton>
    </StackContainer>
  </UForm>
</template>
