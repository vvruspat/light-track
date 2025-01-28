<script setup lang="ts">
import { ref } from "vue";

const links = [
  [
    {
      label: "Epic 1",
      to: "/project/3/epic/1",
    },
    {
      label: "Epic 2",
      to: "/project/3/epic/2",
    },
    {
      label: "Epic 3",
      to: "/project/3/epic/3",
    },
    {
      label: "Epic 4",
      to: "/project/3/epic/4",
    },
  ],
];

const isOpen = ref(false);
</script>

<template>
  <UPopover>
    <UButton
      icon="mdi:chevron-down"
      size="sm"
      color="gray"
      square
      variant="ghost"
      @click="isOpen = true"
    />
    <template #panel>
      <UVerticalNavigation :links="links" />
    </template>
  </UPopover>
</template>
