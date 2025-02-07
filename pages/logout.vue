<script lang="ts" setup>
const router = useRouter();
const client = useSupabaseClient();

await client.auth.signOut();

router.replace("/login");
</script>

<template>
  <UContainer class="w-full h-full">
    <StackContainer justify="center" align-items="center">
      <h1>Logging out...</h1>
      <USkeleton class="w-full h-8 rounded-md" />
    </StackContainer>
  </UContainer>
</template>
