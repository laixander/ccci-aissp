<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
            <UIcon :name="icon" class="w-6 h-6 text-gray-300 dark:text-gray-800" />
            <div class="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                    <h3 class="font-medium text-gray-800 dark:text-gray-100 truncate">{{ system }}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ entity }}</p>
                </div>
                <div class="text-center">
                    <p class="font-semibold text-gray-800 dark:text-gray-100">{{ budget }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                </div>
                <div class="text-center">
                    <UBadge :label="priorityDisplay" :color="priorityColor" variant="soft" class="rounded-full" />
                </div>
                <div class="text-center">
                    <UBadge :label="statusDisplay" :color="statusColor" variant="soft" class="rounded-full" />
                </div>
                <div class="text-center">
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-100">{{ deadline }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                </div>
            </div>
            <div class="flex gap-2">
                <UButton icon="i-lucide-edit" variant="ghost" color="neutral" size="sm" aria-label="Edit System"
                    @click="$emit('edit')" />
                <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm" aria-label="Delete System"
                    @click="$emit('delete')" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    system: string
    entity: string
    budget: string
    priority: 'high' | 'medium' | 'low'
    status: 'active' | 'in progress' | 'planning' | 'completed'
    deadline: string
    icon?: string
}

const props = defineProps<Props>()

// Badge color mappings
const priorityColorMap = {
    high: 'error',
    medium: 'warning',
    low: 'success'
} as const

const statusColorMap = {
    active: 'secondary',
    inprogress: 'orange',
    'in progress': 'orange',
    planning: 'violet',
    completed: 'success'
} as const

const priorityColor = computed(() => priorityColorMap[props.priority] || 'neutral')
const statusColor = computed(() => statusColorMap[props.status] || 'neutral')

// Capitalized display values
const priorityDisplay = computed(() => capitalize(props.priority))
const statusDisplay = computed(() => capitalize(props.status))

function capitalize(str: string) {
    const lower = str.toLowerCase()
    if (lower === 'inprogress' || lower === 'in progress') return 'In Progress'
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const icon = computed(() => props.icon || 'i-lucide-grip-vertical')

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>