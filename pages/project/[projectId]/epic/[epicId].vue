<template>
  <section>
    <ClientOnly fallback="Epic navigation is loading...">
      <Teleport to="#tabbar-center">
        <EpicsNavigation />
      </Teleport>
    </ClientOnly>
    <EpicHeader />
    <EpicView />
    <NuxtPage />
  </section>
</template>
