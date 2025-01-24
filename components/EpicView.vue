<script setup lang="ts">
import StoryView from "~/components/StoryView.vue";
import EpicMenu from "~/components/EpicMenu.vue";
const num =  Math.round(Math.random() * 10);
</script>

<template>
  <div class="w-full h-full max-h-full">
    <Stack direction="column" justify="stretch">
      <Stack
        direction="row"
        justify="between"
        alignItems="center"
        class="w-full"
      >
        <h2 class="px-3 py-4">Epic {{ Math.floor(Math.random() * 10000) }}</h2>
        <EpicMenu />
      </Stack>

      <div class="mb-4">
        <UAccordion
          color="sky"
          variant="link"
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
