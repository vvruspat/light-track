<script setup lang="ts">
definePageMeta({
  title: "Dashboard",
  description: "Select a project",
  middleware: ["auth"],
});

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);

const projectsLinks = computed(() => {
  return projects.value.map((project) => ({
    to: `/project/${project.id}`,
    label: project.title,
  }));
});

projectsStore.fetchProjects(1);
</script>

<template>
  <div>
    <UContainer class="py-4">
      <StackContainer direction="column" spacing="4" align-items="stretch">
        <UText variant="h1">Select a project</UText>
        <UVerticalNavigation :links="projectsLinks" />
      </StackContainer>
    </UContainer>
  </div>
</template>
