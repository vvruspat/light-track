<script setup lang="ts">
const { data: response, status, error } = await useFetch('/api/projects', { headers: useRequestHeaders(['cookie']), query: { group_id: 1 } })

</script>

<template>
    <div>
        <h1>Projects</h1>
    </div>

    <div v-if="status === 'pending'">Loading...</div>
    <div v-else-if="status === 'error'">{{ error?.message }}</div>
    <div v-else-if="status === 'success'">
        <ul v-if="response?.data?.length">
            <li v-for="project in response.data" :key="project.id">    
                <NuxtLink :to="`/project/${project.id}`">{{ project.title }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>