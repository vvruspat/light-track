<script setup lang="ts">
const items = [
  'https://picsum.photos/600/800?random=1',
  'https://picsum.photos/600/800?random=2',
  'https://picsum.photos/600/800?random=3',
  'https://picsum.photos/600/800?random=4',
  'https://picsum.photos/600/800?random=5',
  'https://picsum.photos/600/800?random=6'
]
</script>

<template>
  <UCarousel
    :items="items"
    :ui="{
      item: 'basis-full',
      container: 'flex-1'
    }"
    arrows
    class="w-full h-full flex flex-col justify-stretch flex-1"
  >
    <template #default="{ item }">
        <EpicView :src="item" />
    </template>

    <template #prev="{ onClick, disabled }">
        <UButton label="Prev" color="gray" :disabled="disabled" @click="onClick" >
            <template #leading>
                <UIcon name="i-heroicons-arrow-left-20-solid" class="w-5 h-5" />
            </template>
        </UButton>
    </template>

    <template #next="{ onClick, disabled }">
        <UButton label="next" color="gray" :disabled="disabled" @click="onClick">
            <template #trailing>
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
            </template>
        </UButton>
    </template>
  </UCarousel>
</template>

