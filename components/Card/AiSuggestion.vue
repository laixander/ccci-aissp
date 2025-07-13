<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
                <UBadge v-if="category" :label="category" color="violet" variant="outline" class="rounded-full" />
                <UBadge v-if="priority" :label="priority" :color="priorityColor" variant="soft" class="rounded-full" />
            </div>

            <h3 class="font-medium text-gray-900 mb-1 dark:text-white">{{ title }}</h3>
            <p class="text-sm text-gray-600 mb-2 dark:text-gray-400">{{ description }}</p>

            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span v-if="section">Section: {{ section }}</span>
                <span v-if="date">Generated: {{ date }}</span>
            </div>
        </div>

        <div class="flex gap-2">
            <UButton label="Apply" variant="outline" color="neutral" size="lg" @click="emit('apply')" />
            <UButton label="Dismiss" variant="ghost" color="neutral" size="lg" @click="emit('dismiss')" />
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    title: string
    description: string
    category: string
    priority: 'High' | 'Medium' | 'Low'
    section: string
    date: string
}

const props = defineProps<Props>()

const priorityColorMap = {
    High: 'error',
    Medium: 'warning',
    Low: 'secondary'
} as const

const priorityColor = computed(() => {
    return props.priority ? priorityColorMap[props.priority] : 'neutral'
})

const emit = defineEmits<{
  (e: 'apply'): void
  (e: 'dismiss'): void
}>()

const uiCardConfig = {
    body: 'sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4'
}
</script>
