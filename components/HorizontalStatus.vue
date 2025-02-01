<script setup lang="ts">
type HorizontalStatusProps = {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  rejected: number;
};

const { total, todo, inProgress, done, rejected } =
  defineProps<HorizontalStatusProps>();
</script>

<template>
  <UMeterGroup :min="0" :max="total" size="md" icon="i-heroicons-minus">
    <UMeter :value="todo" color="gray" label="To do" />
    <UMeter :value="inProgress" color="yellow" label="In Progress" />
    <UMeter :value="done" color="green" label="Done" />
    <UMeter :value="rejected" color="red" label="Rejected" />
  </UMeterGroup>
</template>
