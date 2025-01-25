<script setup lang="ts">
const statuses = ["open", "progress", "done", "rejected"];
const statusColors = {
    open: "gray",
    progress: "yellow",
    done: "green",
    rejected: "red",
};

const status = ref(statusColors[statuses[Math.floor(Math.random() * statuses.length)]]);
const isOpen = ref(false);
const src = "https://picsum.photos/600/800?random=" + Math.round(Math.random() * 100);

</script>

<template>
    <UButton :color="status" variant="soft" @click="isOpen = true" :ui="{ rounded: 'rounded-none' }" class="flex-none">
        <Stack spacing="2">
            <UAvatar
                size="2xs"
                :src="src"
                alt="Avatar"
            />
            <div>Task View {{ Math.round(Math.random() * 100000000) }}</div>
        </Stack>
    </UButton>
</template>
