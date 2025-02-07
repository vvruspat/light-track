<script setup lang="ts">
import { retrieveLaunchParams } from '@telegram-apps/sdk';

const { initDataRaw } = retrieveLaunchParams();

console.log('initDataRaw', initDataRaw);
</script>

<template>
  <div>
    Auth
  </div>
</template>
