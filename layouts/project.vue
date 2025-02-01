<script setup lang="ts">
import HorizontalStatus from "@/components/HorizontalStatus.vue";
import ProjectMenu from "@/components/ProjectMenu.vue";

const currentProjectStore = useCurrentProjectStore();
const errorsStore = useErrorsStore();

const { statistics, currentProject } = storeToRefs(currentProjectStore);

const route = useRoute();
const { projectId } = route.params;

try {
  const project = await currentProjectStore.getProjectById(Number(projectId));

  if (project?.epics.length) {
    if (!route.params.epicId) {
      navigateTo(`/project/${projectId}/epic/${project.epics[0].id}`);
    }
  } else {
    const createProjectUrl = `/project/${projectId}/epic/create`;

    if (route.path !== createProjectUrl) {
      navigateTo(createProjectUrl);
    }
  }
} catch (error) {
  errorsStore.setError(error as Error);
  navigateTo("/error");
}
</script>

<template>
  <div class="flex flex-col h-full max-h-full gap-4">
    <header class="p-4">
      <UContainer class="py-4 px-0 w-full align-middle">
        <StackContainer
          direction="row"
          justify="between"
          align-items="center"
          class="w-full"
        >
          <USkeleton v-if="!currentProject" class="w-1/2 h-8" />
          <h1 v-else class="uppercase">{{ currentProject?.title }}</h1>
          <ProjectMenu :project-id="Number(projectId)" />
        </StackContainer>
      </UContainer>
      <HorizontalStatus
        :total="statistics.project.total"
        :todo="statistics.project.todo"
        :in-progress="statistics.project.inProgress"
        :done="statistics.project.done"
        :rejected="statistics.project.rejected"
      />
    </header>
    <UDivider class="m-0" />
    <main class="grow shrink overflow-scroll scroll-smooth px-4 snap-mandatory">
      <slot />
    </main>
    <footer>
      <TabBar />
    </footer>
  </div>
</template>
