<script setup lang="ts">
const isOpen = ref(false);
const router = useRouter();

const people = [
  { id: 1, label: "First project" },
  { id: 2, label: "Second project" },
  { id: 3, label: "Third project" },
  { id: 4, label: "Fourth project" },
  { id: 5, label: "Fifth project" },
];

const selected = ref([]);

const onSelect = (value: { id: number }) => {
  router.push(`/project/${value.id}`);
  isOpen.value = false;
};
</script>

<template>
  <UButton
    label="Projects"
    color="gray"
    variant="solid"
    @click="isOpen = true"
    tabindex="1"
  />

  <UModal v-model="isOpen">
    <UCommandPalette
      v-model="selected"
      :groups="[{ key: 'people', commands: people }]"
      @update:model-value="onSelect"
    />
    <UContainer class="p-4 w-full">
        <UButton
            label="Create new project"
            color="primary"
            variant="solid"
            to="/project/create"
            @click="isOpen = false"
        />
    </UContainer>
  </UModal>
</template>
