<script setup lang="ts">
import StoryMenu from '~/components/StoryMenu.vue';
</script>

<template>
    <Stack direction="column" class="w-full h-full">
        <h2 class="py-4">Epic</h2>

        <Stack direction="column" alignItems="stretch" class="w-full" spacing="4">
            <UCard>
                <template #header>
                    <Stack direction="row" justify="between" class="w-full">
                        <h3>Story 1</h3>
                        <StoryMenu />
                    </Stack>
                </template>

                <Stack direction="row" class="w-full" wrap="wrap">
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                </Stack>
            </UCard>


            <UCard>
                <template #header>
                    <Stack direction="row" justify="between" class="w-full">
                        <h3>Story 2</h3>
                        <StoryMenu />
                    </Stack>
                </template>

                <Stack direction="row" class="w-full" wrap="wrap">
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                    <TaskView />
                </Stack>
            </UCard>

        </Stack>
    </Stack>
</template>