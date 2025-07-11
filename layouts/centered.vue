<template>
    <div :class="['flex flex-col', minHeightClass, backgroundClass, customClass]">
        <div class="flex-1 w-full h-full flex justify-center items-center">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    minHeight: { type: String, default: 'min-h-screen' }, // default is full height
    background: { type: String, default: 'bg-gray-50 dark:bg-gray-950' },
    customClass: { type: String },
});

const minHeightClass = computed(() => props.minHeight);
const backgroundClass = computed(() => props.background);
const customClass = computed(() => props.customClass);
</script>