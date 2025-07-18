<template>
    <UCard :ui="cardUi">
        <div :class="contentClasses">
            <slot />
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    hasHover?: boolean
    tightSpace?: boolean
}>()

// Dynamic UI class for hover
const cardUi = computed(() => ({
    root: props.hasHover
        ? 'shadow-sm hover:shadow-md transition-shadow'
        : ''
}))

// Dynamic class for spacing
const contentClasses = computed(() =>
    props.tightSpace
        ? 'flex items-center gap-4 sm:-m-2'
        : 'flex items-center gap-6'
)
</script>
