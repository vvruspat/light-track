<script setup lang="ts">
import ProjectSelector from "./ProjectSelector.vue";
import StackContainer from "./StackContainer.vue";
</script>

<template>
  <StackContainer
    direction="row"
    spacing="4"
    justify="between"
    align-items="center"
    class="py-4 bg-gray-900 border-gray-800"
  >
    <div class="px-4">
      <ProjectSelector />
    </div>
    <div id="tabbar-center" />
    <div class="px-4">
      <MainMenu />
    </div>
  </StackContainer>
</template>
