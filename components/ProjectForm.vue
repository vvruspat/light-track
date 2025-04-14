<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { projectId } = useRoute().params;
const projectsStore = useProjectsStore();

const currentProjectStore = useCurrentProjectStore();
const { currentProject: project, loadingState } =
  storeToRefs(currentProjectStore);

const templatesStore = useTemplatesStore();
const { loadingState: templatesStatus, templates } =
  storeToRefs(templatesStore);

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  title: project.value?.title ?? "Untitled Project",
  description: project.value?.description ?? "",
  template: undefined as number | undefined,
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
      !state.template ? undefined : Number(state.template),
    );

    if (newProject) {
      await currentProjectStore.getProjectById(Number(newProject.id), true);

      navigateTo(`/project/${newProject.id}`);
    }
  }
}

const projectUrl = computed(() => {
  return project.value?.epics[0]?.id ? `/project/${projectId}/epic/${project.value?.epics[0]?.id}` : `/project/${projectId}/epic/create?emptyProject=true`;
});

templatesStore.fetchTemplates();
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" autoresize />
    </UFormGroup>

    <UFormGroup v-if="!projectId" label="Template" name="template">
      <USelectMenu
        v-if="templatesStatus === 'success'"
        v-model="state.template"
        label
        :options="templates"
        value-attribute="id"
        option-attribute="title"
      />
      <USkeleton v-else class="h-8 w-full" />
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

      <UButton type="button" v-if="projectId" variant="ghost" :to="projectUrl">
        Cancel
      </UButton>
      <UButton v-else variant="ghost" to="/dashboard">Cancel</UButton>
    </StackContainer>
  </UForm>
</template>
