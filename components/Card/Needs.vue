<template>
    <UCard :ui="uiCardConfig">
        <div class="flex items-start justify-between">
            <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                    <!-- Title -->
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ title }}</h3>
                    <!-- Priority Tag -->
                    <div
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        :class="priorityTagClass">
                        {{ capitalize(priority) }}
                    </div>
                    <!-- Type Tag -->
                    <div
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        :class="typeTagClass">
                        {{ capitalize(type) }}
                    </div>
                </div>
                <!-- Description -->
                <p class="text-gray-600 dark:text-gray-300 mb-3">{{ description }}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <!-- Entity -->
                    <span class="flex items-center">
                        <UIcon name="i-lucide-users" class="h-4 w-4 mr-1" />
                        {{ entity }}
                    </span>
                    <!-- Date -->
                    <span class="flex items-center">
                        <UIcon name="i-lucide-calendar" class="h-4 w-4 mr-1" />
                        {{ date }}
                    </span>
                    <!-- Author -->
                    <span>By {{ author }}</span>
                    <!-- Budget -->
                    <span class="font-medium text-gray-900 dark:text-gray-100">{{ budget }}</span>
                </div>
            </div>
            <div class="flex items-center space-x-3 ml-4">
                <!-- Status Tag -->
                <div class="flex items-center space-x-1">
                    <UIcon :name="statusIcon" class="h-4 w-4" :class="statusIconClass" />
                    <div
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        :class="statusTagClass">
                        {{ statusDisplay }}
                    </div>
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    title: { type: String, required: true },
    priority: { type: String, required: true }, // High, Medium, Low
    type: { type: String, required: true },     // Hardware, Software, Infrastructure, Training
    description: { type: String, required: true },
    entity: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, required: true },
    budget: { type: String, required: true },
    status: { type: String, required: true },   // Requested, In Progress, In Review, Approved
})

// Priority tag classes
const priorityTagClass = computed(() => {
    switch (props.priority.toLowerCase()) {
        case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
        case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
        case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
})

// Type tag classes
const typeTagClass = computed(() => {
    switch (props.type.toLowerCase()) {
        case 'hardware': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
        case 'software': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
        case 'infrastructure': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
        case 'training': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
})

// Status tag classes
const statusTagClass = computed(() => {
    switch (props.status.toLowerCase()) {
        case 'requested': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
        case 'in progress':
        case 'inprogress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
        case 'in review':
        case 'inreview': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
        case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
})

// Status icon
const statusIcon = computed(() => {
    switch (props.status.toLowerCase()) {
        case 'requested': return 'i-lucide-mail'
        case 'in progress':
        case 'inprogress': return 'i-lucide-clock'
        case 'in review':
        case 'inreview': return 'i-lucide-search'
        case 'approved': return 'i-lucide-check-circle'
        default: return 'i-lucide-help-circle'
    }
})

const statusIconClass = computed(() => {
    switch (props.status.toLowerCase()) {
        case 'requested': return 'text-blue-500 dark:text-blue-300'
        case 'in progress':
        case 'inprogress': return 'text-orange-500 dark:text-orange-300'
        case 'in review':
        case 'inreview': return 'text-yellow-500 dark:text-yellow-300'
        case 'approved': return 'text-green-500 dark:text-green-300'
        default: return 'text-gray-500 dark:text-gray-300'
    }
})

function capitalize(str: string) {
    if (!str) return ''
    if (str.toLowerCase() === 'inprogress' || str.toLowerCase() === 'in progress') return 'In Progress'
    if (str.toLowerCase() === 'inreview' || str.toLowerCase() === 'in review') return 'In Review'
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const statusDisplay = computed(() => {
    if (props.status.toLowerCase() === 'in progress' || props.status.toLowerCase() === 'inprogress') {
        return 'In Progress'
    }
    if (props.status.toLowerCase() === 'in review' || props.status.toLowerCase() === 'inreview') {
        return 'In Review'
    }
    return props.status.charAt(0).toUpperCase() + props.status.slice(1)
})

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>