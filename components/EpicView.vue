<script setup lang="ts">
import StoryView from "~/components/StoryView.vue";
const num = Math.round(Math.random() * 10) + 1;
</script>

<template>
  <div class="w-full h-full max-h-full">
    <Stack direction="column" justify="stretch">
      <div class="my-4 w-full">
        <UAccordion
          color="gray"
          variant="ghost"
          size="sm"
          :items="[
            {
              label: 'Description',
              content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            },
          ]"
        />
      </div>

      <Stack direction="column" alignItems="stretch" spacing="4">
        <StoryView v-for="index in num" :key="index" />
      </Stack>
    </Stack>
  </div>
</template>
