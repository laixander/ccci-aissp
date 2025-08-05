<template>
  <div :class="computedGridClass">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cols: {
    type: [Number, String, Object],
    default: 1, // Can be a number or an object like { base: 1, sm: 2, md: 3 }
  },
  gap: {
    type: [String, Object],
    default: '4', // Can be a string or an object like { base: '4', sm: 'x-4' }
  }
})

// === GAP CLASSES ===
const resolveGapClass = (prefix, value) => {
  if (!value) return ''
  if (value.startsWith('gap-')) return prefix ? `${prefix}:${value}` : value
  if (value.startsWith('x-') || value.startsWith('y-')) return prefix ? `${prefix}:gap-${value}` : `gap-${value}`
  return prefix ? `${prefix}:gap-${value}` : `gap-${value}`
}

const gapClasses = computed(() => {
  if (typeof props.gap === 'string') return [resolveGapClass('', props.gap)]

  const { base, sm, md, lg, xl } = props.gap
  return [
    resolveGapClass('', base),
    resolveGapClass('sm', sm),
    resolveGapClass('md', md),
    resolveGapClass('lg', lg),
    resolveGapClass('xl', xl),
  ].filter(Boolean)
})

// === COL CLASSES ===
const resolveColClass = (prefix, value) => {
  if (!value) return ''
  return prefix ? `${prefix}:grid-cols-${value}` : `grid-cols-${value}`
}

const colClasses = computed(() => {
  if (typeof props.cols === 'string' || typeof props.cols === 'number') {
    return [`grid-cols-${props.cols}`]
  }

  const { base, sm, md, lg, xl } = props.cols
  return [
    resolveColClass('', base),
    resolveColClass('sm', sm),
    resolveColClass('md', md),
    resolveColClass('lg', lg),
    resolveColClass('xl', xl),
  ].filter(Boolean)
})

// === FINAL CLASS COMPOSITION ===
const computedGridClass = computed(() => {
  return ['grid', ...gapClasses.value, ...colClasses.value].filter(Boolean).join(' ')
})
</script>
