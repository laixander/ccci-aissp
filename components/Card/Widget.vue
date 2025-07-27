<!-- components/Card/Widget.vue -->
<template>
  <UCard class="hover:shadow-lg transition-shadow">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">{{ value }}</p>
        <div class="flex items-center gap-1 mt-2">
          <UIcon
            :name="isIncrease ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
            :class="[isIncrease ? 'text-green-500' : 'text-red-500']"
          />
          <span :class="[isIncrease ? 'text-green-600' : 'text-red-600', 'text-sm']">
            {{ isIncrease ? '+' : '-' }}{{ Math.abs(percentageChange) }}%
          </span>
        </div>
      </div>
      <div :class="`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgColor}`">
        <UIcon :name="iconName" :class="['size-6', iconColor]" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { WidgetProps } from '~/types/cards'
import { useWidgetChange } from '~/composables/useWidgetChange'

const props = defineProps<WidgetProps>()

const { isIncrease } = useWidgetChange(props.changeType)
</script>
