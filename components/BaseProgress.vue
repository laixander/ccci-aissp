<template>
  <UFormField
    :label="label"
    :hint="`${value}%`"
    :size="size"
    :ui="computedUi"
  >
    <UProgress :model-value="value" :color="color" :size="size" />
  </UFormField>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  value: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'neutral' | 'error' | 'warning' | 'success'

  justifyStart?: boolean
  justifyEnd?: boolean
  justifyBetween?: boolean
}>()

const computedUi = computed(() => {
  const justifyClass = props.justifyStart
    ? 'justify-start'
    : props.justifyEnd
    ? 'justify-end'
    : 'justify-between' // default fallback

  return {
    labelWrapper: `${justifyClass} gap-2`
  }
})
</script>
