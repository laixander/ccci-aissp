<template>
    <UCard variant="soft" :ui="uiCardConfig">
        <div class="flex items-center gap-4">
            <UChip standalone inset size="xl" :color="typeColor" />
            <div class="flex-1">
                <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ title }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-500">{{ description }}</p>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400 w-20 text-right">{{ timeAgo }}</span>
        </div>
    </UCard>
</template>

<script setup lang="ts">
type UiColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'violet'
  | 'orange'
  | 'purple'

const props = defineProps<{
  title: string
  description: string
  timeAgo: string
  typeColor: UiColor
}>()

const uiCardConfig = {
    body: 'sm:p-3'
}
</script>
