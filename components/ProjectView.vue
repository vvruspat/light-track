<script setup lang="ts">
import type { TProject } from '~/types/entities'
import HorizontalStatus from '~/components/HorizontalStatus.vue'
import EpicsView from '~/components/EpicsView.vue'
import ProjectMenu from '~/components/ProjectMenu.vue'

type ProjectCardProps = TProject & { loading: boolean }

// const { loading, ...project } = defineProps<ProjectCardProps>();

const id = useRoute().params.id;

</script>

<template>
  <section class="flex flex-col h-full">
    <header>
      <UContainer class="py-4 px-0 w-full align-middle">
        <Stack
          direction="row"
          justify="between"
          alignItems="center"
          class="w-full"
        >
          <h1 class="uppercase">Project title {{ id }}</h1>
          <ProjectMenu />
        </Stack>
      </UContainer>
      <HorizontalStatus />
    </header>
    <UDivider class="my-4" />
    <EpicsView />
  </section>
</template>