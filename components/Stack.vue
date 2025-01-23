<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type StackProps = {
    direction?: 'row' | 'column';
    spacing?: '0' | '1' | '2' | '3' | '4';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
}

const { direction, spacing, justify, alignItems, wrap } = defineProps<StackProps>();

// Use other div attributes
const { class: externalClasses, restAttributes } = useAttrs();

const classes = computed(() => {
    return [
        'flex',
        direction === 'column' ? 'flex-col' : 'flex-row',
        spacing ? `gap-${spacing}` : '',
        justify ? `justify-${justify}` : 'justify-start',
        alignItems ? `items-${alignItems}` : 'items-start',
        wrap ? `flex-${wrap}` : 'flex-nowrap',
        externalClasses,
    ].join(' ');
});
</script>

<template>
    <div :class="classes" v-bind="restAttributes">
        <slot />
    </div>
</template>

<style scoped>
.gap-0 {
    gap: 0;
}

.gap-1 {
    gap: 0.25rem;
}

.gap-2 {
    gap: 0.5rem;
}

.gap-3 {
    gap: 0.75rem;
}

.gap-4 {
    gap: 1rem;
}

.flex-wrap {
    flex-wrap: wrap;
}

.flex-nowrap {
    flex-wrap: nowrap;
}

.flex-wrap-reverse {
    flex-wrap: wrap-reverse;
}
</style>