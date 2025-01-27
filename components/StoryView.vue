<script setup lang="ts">

import TaskView from '~/components/TaskView.vue';

const cardConfig = {
    header: {
        padding: 'py-2',
    },
    footer: {
        padding: 'py-2',
    },
};

</script>

<template>
  <UCard :ui="cardConfig" class="snap-center">
    <template #header>
      <Stack
        direction="row"
        justify="between"
        alignItems="center"
        class="w-full"
      >
        <h3>Story</h3>
        <StoryMenu />
      </Stack>
    </template>

    <Stack
      direction="row"
      class="w-full"
      wrap="wrap"
      justify="stretch"
      spacing="1"
    >
      <TaskView />
      <TaskView />
      <TaskView />
      <TaskView />
      <TaskView />
      <TaskView />
      <TaskView />
      <TaskView />
      <TaskView />
    </Stack>

    <template v-if="Boolean(Math.round(Math.random()))" #footer>
        <UAccordion
            color="sky"
            variant="link"
            size="sm"
            :items="[{ label: 'Description', content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.` }]"
        />
    </template>
  </UCard>
</template>
