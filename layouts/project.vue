<script setup lang="ts">
import HorizontalStatus from '~/components/HorizontalStatus.vue'
import ProjectMenu from '~/components/ProjectMenu.vue'

const id = useRoute().params.projectId;
const router = useRouter();

if (!id) {
  router.push('/project/create');
}

</script>

<template>
  <div class="flex flex-col h-full max-h-full gap-4">
    <header class="p-4">
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
    <UDivider class="m-0" />
    <main class="grow shrink overflow-scroll px-4 snap-mandatory">
      <slot />
    </main>
    <footer>
      <TabBar />
    </footer>
  </div>
</template>