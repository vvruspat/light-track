<template>
  <UCard class="h-full py-8 flex items-center justify-center">
    <ClientOnly fallback-tag="span">
      <template #fallback>
        <StackContainer direction="row" align-items="center" spacing="4">
          <UIcon name="svg-spinners:pulse-multiple" class="w-8 h-8" />
          <div>Authenticating...</div>
        </StackContainer>
      </template>
      <TgAuth />
    </ClientOnly>
  </UCard>
</template>
