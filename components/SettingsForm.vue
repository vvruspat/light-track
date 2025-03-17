<script lang="ts" setup>
const state = reactive({
  googleApiKey: "",
});

function onSubmit() {
  console.log(state.googleApiKey);
}
</script>

<template>
  <UForm :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Google drive API key" name="google-api-key">
      <UInput v-model="state.googleApiKey" />
    </UFormGroup>
    <UButton label="Save" color="primary" />
  </UForm>
</template>

<style>

</style>