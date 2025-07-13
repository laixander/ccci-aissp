<template>
    <UCard :ui="uiCardConfig">
        <div class="flex items-start justify-between">
            <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ title }}</h3>
                    <UBadge :label="priorityDisplay" :color="priorityColor" variant="soft" class="rounded-full" />
                    <UBadge :label="tagDisplay" :color="tagColor" class="rounded-full" />
                </div>
                <p class="text-gray-600 dark:text-gray-300 mb-3">{{ description }}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span class="flex items-center">
                        <UIcon name="i-lucide-users" class="h-4 w-4 mr-1" />
                        {{ entity }}
                    </span>
                    <span class="flex items-center">
                        <UIcon name="i-lucide-calendar" class="h-4 w-4 mr-1" />
                        {{ date }}
                    </span>
                    <span>By {{ author }}</span>
                    <span class="font-medium text-gray-900 dark:text-gray-100">{{ budget }}</span>
                </div>
            </div>
            <div class="flex items-center space-x-3 ml-4">
                <UIcon :name="statusIcon" class="h-4 w-4" :class="statusIconClass" />
                <UBadge :label="statusDisplay" :color="statusColor" variant="soft" class="rounded-full" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    title: string
    priority: 'High' | 'Medium' | 'Low'
    type: 'Hardware' | 'Software' | 'Infrastructure' | 'Training'
    description: string
    entity: string
    date: string
    author: string
    budget: string
    status: 'Requested' | 'In Progress' | 'In Review' | 'Approved'
}

const props = defineProps<Props>()

// Mappings
const priorityColorMap = {
    High: 'error',
    Medium: 'warning',
    Low: 'success'
} as const

const typeColorMap = {
    Hardware: 'primary',
    Software: 'violet',
    Infrastructure: 'orange',
    Training: 'success'
} as const

const statusColorMap = {
    Requested: 'primary',
    'In Progress': 'warning',
    'In Review': 'secondary',
    Approved: 'success'
} as const

const statusIconMap = {
    Requested: 'i-lucide-mail',
    'In Progress': 'i-lucide-clock',
    'In Review': 'i-lucide-search',
    Approved: 'i-lucide-check-circle'
} as const

const statusIconColorMap = {
    Requested: 'text-blue-500 dark:text-blue-300',
    'In Progress': 'text-orange-500 dark:text-orange-300',
    'In Review': 'text-yellow-500 dark:text-yellow-300',
    Approved: 'text-green-500 dark:text-green-300'
} as const

// Computed Color & Display
const priorityDisplay = computed(() => props.priority)
const tagDisplay = computed(() => props.type)
const statusDisplay = computed(() => props.status)

const priorityColor = computed(() => priorityColorMap[props.priority] || 'neutral')
const tagColor = computed(() => typeColorMap[props.type] || 'neutral')
const statusColor = computed(() => statusColorMap[props.status] || 'neutral')

const statusIcon = computed(() => statusIconMap[props.status] || 'i-lucide-help-circle')
const statusIconClass = computed(() => statusIconColorMap[props.status] || 'text-gray-500 dark:text-gray-300')

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>
