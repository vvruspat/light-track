<script setup lang="ts">
import { ref } from "vue";

const links = [
  [
    {
      label: "Edit story",
      icon: "i-heroicons-question-mark-circle",
    },
    {
      label: "Remove story",
      icon: "i-heroicons-question-mark-circle",
    },
  ],
];

const isOpen = ref(false);
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

      <Stack direction="column">
        <UContainer class="p-4">
          <UButton to="/project/3/epic/1/story/5/task/create">Create new task</UButton>
        </UContainer>
        
        <UVerticalNavigation :links="links" />
      </Stack>
    </template>
</UPopover>
</template>
