<template>
  <UCard class="h-full py-8 flex items-center justify-center">
    <ClientOnly fallback-tag="span" fallback="Authenticating...">
      <TgAuth />
    </ClientOnly>
  </UCard>
</template>
