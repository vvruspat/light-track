<script setup lang="ts">
import { ref } from "vue";

const links = [
  [
    {
      label: "Dashboard",
      icon: "mdi:apps",
      to: "/dashboard",
    },
  ],
];

const isOpen = ref(false);
</script>

<template>
  <UButton
    icon="line-md:menu"
    size="sm"
    color="gray"
    square
    variant="solid"
    @click="isOpen = true"
  />
  <UModal v-model="isOpen">
    <UVerticalNavigation :links="links" />
  </UModal>
</template>
