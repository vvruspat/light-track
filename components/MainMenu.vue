<script setup lang="ts">
import { ref } from 'vue'

const links = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    badge: 100
  }, {
    label: 'Installation',
    icon: 'i-heroicons-home',
    to: '/getting-started/installation'
  }, {
    label: 'Vertical Navigation',
    icon: 'i-heroicons-chart-bar',
    to: '/components/vertical-navigation'
  }, {
    label: 'Command Palette',
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette'
  }], [{
    label: 'Examples',
    icon: 'i-heroicons-light-bulb'
  }, {
    label: 'Help',
    icon: 'i-heroicons-question-mark-circle'
  }]
]

const isOpen = ref(false)

</script>

<template>
    <UButton 
        icon="line-md:menu"
        size="sm"
        color="gray"
        square
        variant="solid"
        @click="isOpen = true"
    />
    <UModal v-model="isOpen">
        <UVerticalNavigation :links="links" />
    </UModal>
</template>