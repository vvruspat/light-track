<script setup lang="ts">
import { ref } from "vue";
import Stack from "~/components/Stack.vue";

const links = [
  [
    {
      label: "Edit project",
      icon: "i-heroicons-question-mark-circle",
    },
    {
      label: "Remove project",
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
      variant="ghost"
      @click="isOpen = true"
    />
    <template #panel>

      <Stack direction="column">
        <UContainer class="p-4">
          <UButton to="/project/3/epic/create">Create new epic</UButton>
        </UContainer>
        
        <UVerticalNavigation :links="links" />
      </Stack>
    </template>
</UPopover>
</template>
