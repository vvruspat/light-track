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

</script>

<template>
    <UButton :color="status" variant="soft" @click="isOpen = true" :ui="{ rounded: 'rounded-none' }" class="flex-none">
        <Stack spacing="2">
            <UAvatar
                size="2xs"
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                alt="Avatar"
            />
            <div>Task View {{ Math.round(Math.random() * 100000000) }}</div>
        </Stack>
    </UButton>
</template>
