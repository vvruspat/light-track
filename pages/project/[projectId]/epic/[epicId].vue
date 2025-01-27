<script setup lang="ts">
import EpicsNavigation from '@/components/EpicsNavigation.vue'
import EpicView from '@/components/EpicView.vue'
</script>

<template>
  <Teleport to="#tabbar-center">
    <EpicsNavigation />
  </Teleport>
  <EpicHeader />
  <EpicView />
  <NuxtPage />
</template>