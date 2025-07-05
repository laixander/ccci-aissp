<template>
  <div>
    <div class="flex justify-between mb-1">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ label }}</span>
      <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ value }}%</span>
    </div>
    <UProgress v-model="value" color="neutral" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Progress' },
  value: { type: Number, default: 50 }
})

const value = computed(() => props.value)
</script>