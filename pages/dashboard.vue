<script setup lang="ts">
definePageMeta({
  title: "Dashboard",
  description: "Select a project",
});

const projectsStore = useProjectsStore();
const { projects, loadingState } = storeToRefs(projectsStore);

const projectsLinks = computed(() => {
  return projects.value.map((project) => ({
    to: `/project/${project.id}`,
    label: project.title,
  }));
});

await projectsStore.fetchProjects();
</script>

<template>
  <div>
    <div v-if="loadingState === 'success'">
      <UContainer class="py-4">
        <StackContainer
          v-if="projects.length > 0"
          direction="column"
          spacing="4"
          align-items="stretch"
        >
          <h1>Select a project</h1>
          <UVerticalNavigation :links="projectsLinks" :ui="{ padding: 'px-0' }">
            <template #default="{ link }">
              <UButton
                :to="link.to"
                color="gray"
                class="w-full"
                trailing-icon="i-heroicons-arrow-right-20-solid"
                :block="true"
                :ui="{ block: 'w-full flex justify-between items-center' }"
              >
                {{ link.label }}
              </UButton>
            </template>
          </UVerticalNavigation>
          <div>
            <UButton to="/project/create" variant="outline"
              >Create new project</UButton
            >
          </div>
        </StackContainer>
        <UCard v-else>
          <StackContainer
            direction="column"
            spacing="4"
            justify="center"
            align-items="center"
          >
            <h1>No projects found</h1>
            <UButton to="/project/create">Create a project</UButton>
          </StackContainer>
        </UCard>
      </UContainer>
    </div>
    <StackContainer
      v-else-if="loadingState === 'pending' || loadingState === 'idle'"
      direction="row"
      align-items="center"
      spacing="4"
      class="h-full"
    >
      <UIcon name="svg-spinners:pulse-multiple" class="w-8 h-8" />
      <div>Loading projects...</div>
    </StackContainer>
    <StackContainer
      v-else-if="loadingState === 'error'"
      direction="row"
      align-items="center"
      spacing="4"
      class="h-full"
    >
      <UIcon name="svg-regular:exclamation-triangle" class="w-8 h-8" />
      <div>Error loading projects</div>
    </StackContainer>
    <div v-else><USkeleton class="h-4 w-full" /></div>
  </div>
</template>
