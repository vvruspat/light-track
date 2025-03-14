<script setup lang="ts">
import { ref } from "vue";

type EpicMenuProps = {
  projectId: number;
  epicId: number;
};

const currentProjectStore = useCurrentProjectStore();
const epicStore = useEpicsStore();

const { projectId, epicId } = defineProps<EpicMenuProps>();
const links = [
  [
    {
      label: "Edit epic",
      icon: "i-heroicons-question-mark-circle",
      to: `/project/${projectId}/epic/${epicId}/edit`,
    },
    {
      label: "Remove epic",
      icon: "i-heroicons-question-mark-circle",
      click: () => {
        isRemoveAlertOpen.value = true;
      },
    },
  ],
];

const createStoryUrl = `/project/${projectId}/epic/${epicId}/story/create`;

const isOpen = ref(false);
const isRemoveAlertOpen = ref(false);

const onRemoveDialogClose = async (isConfirmed: boolean) => {
  if (isConfirmed) {
    await epicStore.deleteEpic(epicId);
    const project = await currentProjectStore.getProjectById(projectId, true);

    if (project?.epics.length) {
      await navigateTo(`/project/${projectId}/epic/${project.epics[0].id}`);
    } else {
      await navigateTo(`/project/${projectId}/epic/create?emptyProject=true`);
    }
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
      variant="solid"
      @click="isOpen = true"
    />
    <template #panel>
      <StackContainer direction="column">
        <UContainer class="p-4">
          <UButton :to="createStoryUrl">Create new story</UButton>
        </UContainer>

        <UVerticalNavigation :links="links" />
      </StackContainer>
    </template>
  </UPopover>
  <RemoveDialog
    v-model="isRemoveAlertOpen"
    title="Delete confirmation."
    description="Are you sure you want to delete this epic?"
    @close="onRemoveDialogClose"
  />
</template>
