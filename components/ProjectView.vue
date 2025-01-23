<script setup lang="ts">
import type { TProject } from '~/types/entities'
import HorizontalStatus from '~/components/HorizontalStatus.vue'
import EpicsView from '~/components/EpicsView.vue'
type ProjectCardProps = TProject & { loading: boolean }

// const { loading, ...project } = defineProps<ProjectCardProps>();

</script>

<template>
  <section class="flex flex-col h-full">
    <header>
      <UContainer class="py-4 px-0 w-full align-middle">
        <h1 class="uppercase">Project</h1>
      </UContainer>
      <HorizontalStatus />
    </header>
    <UDivider class="my-4" />
    <EpicsView />
  </section>
</template>