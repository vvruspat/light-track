<script setup lang="ts">
const total = Math.floor(Math.random() * 200);
const open = Math.floor(Math.random() * total);
const inProgress = Math.floor(Math.random() * (total - open));
const done = Math.floor(Math.random() * (total - open - inProgress));
const rejected = total - open - inProgress - done;
</script>

<template>
  <UMeterGroup :min="0" :max="total" size="md" icon="i-heroicons-minus">
    <UMeter :value="open" color="gray" label="To do" />
    <UMeter :value="inProgress" color="yellow" label="In Progress" />
    <UMeter :value="done" color="green" label="Done" />
    <UMeter :value="rejected" color="red" label="Rejected" />
  </UMeterGroup>
</template>
