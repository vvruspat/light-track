<template>
  <div>
    <ClientOnly fallback-tag="span" fallback="Loading task...">
      <TaskModal />
    </ClientOnly>
  </div>
</template>
