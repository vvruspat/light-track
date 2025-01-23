<script setup lang="ts">

import { useRoute } from 'vue-router';
import ProjectView from '~/components/ProjectView.vue';

const id = useRoute().params.id;
</script>

<template>
  <ProjectView />
</template>