<script setup lang="ts">
const { data, status, error } = await useFetch('/api/projects', { headers: useRequestHeaders(['cookie']), query: { group_id: 1 } })

</script>

<template>
    <div>
        <h1>Projects</h1>
    </div>

    <div v-if="status === 'loading'">Loading...</div>
    <div v-else-if="status === 'error'">{{ error.message }}</div>
    <div v-else-if="status === 'success'">
        <ul>
            <li v-for="project in data" :key="project.id">
                <NuxtLink :to="`/project/${project.id}`">{{ project.name }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>