<script setup lang="ts">
import { ref } from "vue";

type ProjectMenuProps = {
  projectId: number;
};
const { projectId } = defineProps<ProjectMenuProps>();

const projectStore = useProjectsStore();
const { loadingState } = storeToRefs(projectStore);

const saveTemplateIcon = computed(() => {
  switch (loadingState.value) {
    case "pending":
      return "svg-spinners:pulse-multiple";
    default:
      return "icon-park-solid:page-template";
  }
});

const links = computed(() => [
  [
    {
      label: "Edit project",
      icon: "i-heroicons-pencil-square",
      to: `/project/${projectId}/edit`,
    },
    {
      label: "Save project as template",
      icon: saveTemplateIcon.value,
      click: async () => {
        await projectStore.saveAsTemplate(projectId);
      },
    },
    {
      label: "Remove project",
      icon: "i-heroicons-trash",
      click: () => {
        isRemoveAlertOpen.value = true;
      },
    },
  ],
]);

const isOpen = ref(false);
const isRemoveAlertOpen = ref(false);

const createEpicUrl = `/project/${projectId}/epic/create`;

const onRemoveDialogClose = async (isConfirmed: boolean) => {
  if (isConfirmed) {
    await projectStore.deleteProject(projectId);
    await navigateTo("/dashboard");
  }
  isRemoveAlertOpen.value = false;
};
</script>

<template>
  <UPopover>
    <UButton
      icon="mdi:dots-vertical"
      size="sm"
      color="gray"
      square
      variant="ghost"
      @click="isOpen = true"
    />
    <template #panel>
      <StackContainer direction="column">
        <UContainer class="p-4 w-full">
          <UButton :to="createEpicUrl" class="w-full justify-center">Create new epic</UButton>
        </UContainer>

        <UVerticalNavigation :links="links" />
      </StackContainer>
    </template>
  </UPopover>
  <RemoveDialog
    v-model="isRemoveAlertOpen"
    title="Delete confirmation."
    description="Are you sure you want to delete this project?"
    @close="onRemoveDialogClose"
  />
</template>
