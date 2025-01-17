<script setup lang="ts">
const links = [{
  label: 'Home',
  to: '/',
}, {
  label: 'Docs',
  to: '/docs'
}]
</script>

<template>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>