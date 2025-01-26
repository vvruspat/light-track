<script setup lang="ts">
import type { UButton } from '#components';

const statuses: Array<keyof typeof statusColors> = ["open", "progress", "done", "rejected"];
const statusColors: { [key in 'open' | 'progress' | 'done' | 'rejected']: typeof UButton["color"] } = {
    open: "gray",
    progress: "yellow",
    done: "green",
    rejected: "red",
};

const status = ref(statusColors[statuses[Math.floor(Math.random() * statuses.length)]]);
const src = "https://picsum.photos/600/800?random=" + Math.round(Math.random() * 100);
const { projectId, epicId } = useRoute().params;
const taskId = Math.round(Math.random() * 100000000);
const url = computed(() => `/project/${projectId}/epic/${epicId}/task/${taskId}`);

</script>

<template>
    <UButton :color="status" variant="soft" :to="url" :ui="{ rounded: 'rounded-none' }" class="flex-none">
        <Stack spacing="2">
            <UAvatar
                size="2xs"
                :src="src"
                alt="Avatar"
            />
            <div>Task View {{ taskId }}</div>
        </Stack>
    </UButton>
</template>
