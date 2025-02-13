<script setup lang="ts">
definePageMeta({
  title: "Dashboard",
  description: "Select a project",
});

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);

const projectsLinks = computed(() => {
  return projects.value.map((project) => ({
    to: `/project/${project.id}`,
    label: project.title,
  }));
});

projectsStore.fetchProjects();
</script>

<template>
  <div>
    <UContainer class="py-4">
      <StackContainer
        v-if="projects.length > 0"
        direction="column"
        spacing="4"
        align-items="stretch"
      >
        <UText variant="h1">Select a project</UText>
        <UVerticalNavigation :links="projectsLinks" />
      </StackContainer>
      <UCard v-else>
        <StackContainer
          direction="column"
          spacing="4"
          justify="center"
          align-items="center"
        >
          <UText variant="h1">No projects found</UText>
          <UButton to="/project/create">Create a project</UButton>
        </StackContainer>
      </UCard>
    </UContainer>
  </div>
</template>
