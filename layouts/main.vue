<script setup lang="ts">
    import Stack from '~/components/Stack.vue';
    import TabBar from '~/components/TabBar.vue';
</script>

<template>
    <!-- <Stack direction="column" justify="stretch" alignItems="stretch" class="h-full w-full">
        <UContainer class="p-4 flex-1 box-border overflow-hidden">
            <slot />
        </UContainer>
        <TabBar />
    </Stack> -->
    <NuxtPage />
</template>

<style>
    #__nuxt {
        height: 100vh;
    }
</style>