<!-- components/BaseProgress.vue -->
<template>
    <UFormField :label="label" :hint="`${value}%`" :size="size" :ui="computedUi">
        <UProgress :model-value="value" :color="color" :size="size" />
    </UFormField>
</template>

<script setup lang="ts">
import type { BaseProgressProps } from '~/types/components'

const props = defineProps<BaseProgressProps>()

const computedUi = computed(() => {
    const justifyClass = props.justifyStart
        ? 'justify-start'
        : props.justifyEnd
            ? 'justify-end'
            : 'justify-between'

    return {
        labelWrapper: `${justifyClass} gap-2`
    }
})
</script>