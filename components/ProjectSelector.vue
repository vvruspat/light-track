<script setup lang="ts">
const isOpen = ref(false);

const projectsStore = useProjectsStore();

const { projects } = storeToRefs(projectsStore);

const projectsItems = computed(() =>
  projects.value.map((project) => ({ id: project.id, label: project.title })),
);

const selected = ref([]);

const onSelect = async (value: { id: number }) => {
  isOpen.value = false;
  await navigateTo(`/project/${value.id}`);
};

await projectsStore.fetchProjects();
</script>

<template>
  <UButton
    label="Projects"
    color="gray"
    variant="solid"
    tabindex="1"
    @click="isOpen = true"
  />

  <UModal v-model="isOpen">
    <UCommandPalette
      v-model="selected"
      :groups="[{ key: 'projectsItems', commands: projectsItems }]"
      @update:model-value="onSelect"
    />
    <UContainer class="p-4 w-full">
      <UButton
        label="Create new project"
        color="primary"
        variant="solid"
        to="/project/create"
        @click="isOpen = false"
      />
    </UContainer>
  </UModal>
</template>
