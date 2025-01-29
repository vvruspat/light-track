<script setup lang="ts">
import { ref } from "vue";

const links = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
    {
      label: "Settings",
      icon: "i-heroicons-home",
      to: "/settings",
    },
    {
      label: "Logout",
      icon: "i-heroicons-chart-bar",
      to: "/logout",
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
