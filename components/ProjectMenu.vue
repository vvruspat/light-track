<script setup lang="ts">
import { ref } from "vue";

type ProjectMenuProps = {
  projectId: number;
};
const { projectId } = defineProps<ProjectMenuProps>();

const router = useRouter();

const projectStore = useProjectsStore();

const links = [
  [
    {
      label: "Edit project",
      icon: "i-heroicons-question-mark-circle",
      to: `/project/${projectId}/edit`,
    },
    {
      label: "Save project as template",
      icon: "icon-park-solid:page-template",
      click: async () => {
        await projectStore.saveAsTemplate(projectId);
      },
    },
    {
      label: "Remove project",
      icon: "i-heroicons-question-mark-circle",
      click: () => {
        isRemoveAlertOpen.value = true;
      },
    },
  ],
];

const isOpen = ref(false);
const isRemoveAlertOpen = ref(false);

const createEpicUrl = `/project/${projectId}/epic/create`;

const onRemoveDialogClose = async (isConfirmed: boolean) => {
  if (isConfirmed) {
    await projectStore.deleteProject(projectId);
    router.push("/dashboard");
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
        <UContainer class="p-4">
          <UButton :to="createEpicUrl">Create new epic</UButton>
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
