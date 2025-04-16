<script lang="ts" setup>
type RemoveDialogEmits = (e: "close", isConfirmed: boolean) => void;

type RemoveDialogProps = {
  title?: string;
  description: string;
};

const isOpen = defineModel<boolean>();
const emit = defineEmits<RemoveDialogEmits>();
const { title = "Delete confirmation", description } =
  defineProps<RemoveDialogProps>();

const onRemoveClick = () => {
  emit("close", true);
  isOpen.value = false;
};
</script>

<template>
  <UModal v-model="isOpen" @close="() => emit('close', false)">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <StackContainer direction="row" justify="between" align-items="center">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ title }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </StackContainer>
      </template>

      <div>{{ description }}</div>

      <template #footer>
        <StackContainer direction="row" spacing="4" justify="end">
          <UButton color="gray" variant="ghost" @click="isOpen = false">
            Cancel
          </UButton>
          <UButton color="primary" @click="onRemoveClick"> Remove </UButton>
        </StackContainer>
      </template>
    </UCard>
  </UModal>
</template>
