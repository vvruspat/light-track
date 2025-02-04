<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { projectId } = useRoute().params;
const projectsStore = useProjectsStore();
const currentProjectStore = useCurrentProjectStore();
const { currentProject: project } = storeToRefs(currentProjectStore);
const authStore = useAuthStore();

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
  // Do something with data
  const groupId = authStore.currentUser?.groupId;

  if (!groupId) {
    throw new Error("User is not in a group");
  }

  if (projectId) {
    await projectsStore.updateProject(
      Number(projectId),
      state.title,
      state.description,
    );
  } else {
    await projectsStore.createProject(groupId, state.title, state.description);
  }

  await currentProjectStore.getProjectById(Number(projectId), true);
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
      <UButton type="submit">
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
