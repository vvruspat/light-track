<script setup lang="ts">
type HorizontalStatusProps = {
  total: number;
  todo: number;
  progress: number;
  done: number;
  rejected: number;
};

const { total, todo, progress, done, rejected } =
  defineProps<HorizontalStatusProps>();
</script>

<template>
  <UMeterGroup :min="0" :max="total" size="md" icon="i-heroicons-minus">
    <UMeter :value="todo" color="gray" label="To do" />
    <UMeter :value="progress" color="yellow" label="In Progress" />
    <UMeter :value="done" color="green" label="Done" />
    <UMeter :value="rejected" color="red" label="Rejected" />
  </UMeterGroup>
</template>
