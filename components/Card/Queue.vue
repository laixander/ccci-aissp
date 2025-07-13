<template>
    <UCard :ui="uiCardConfig">
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium text-gray-800 dark:text-gray-200">{{ name }}</p>
                <div class="flex items-center gap-2 mt-1">
                    <UIcon :name="icon" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="text-sm text-gray-600 dark:text-gray-500">{{ date }}</span>
                </div>
            </div>
            <UBadge :label="priority" :color="priorityColor" variant="soft" class="rounded-full" />
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    name: string
    priority: 'High' | 'Medium' | 'Low'
    date: string
    icon: string
}

const props = defineProps<Props>()

const priorityColorMap = {
    Low: 'success',
    Medium: 'warning',
    High: 'error',
} as const

const priorityColor = computed(() => {
    return props.priority ? priorityColorMap[props.priority] : 'neutral'
})

const uiCardConfig = {
    body: 'sm:p-3'
}
</script>