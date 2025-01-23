<script setup lang="ts">

import ProjectSelector from './ProjectSelector.vue'
import Stack from './Stack.vue'

</script>

<template>
  <Stack direction="row" spacing="4" justify="between" alignItems="center" class="py-4 bg-gray-900 border-gray-800">
    <div class="px-4">
      <ProjectSelector />
    </div>
    <div class="px-4">
      <MainMenu />
    </div>
  </Stack>
</template>