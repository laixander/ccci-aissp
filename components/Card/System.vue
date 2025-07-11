<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
            <UIcon name="i-lucide-grip-vertical" class="w-6 h-6 text-gray-300 dark:text-gray-800" />
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
                    <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
                        :class="priorityClass(priority)">
                        {{ capitalize(priority) }}
                    </div>
                </div>
                <div class="text-center">
                    <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
                        :class="statusClass(status)">
                        {{ capitalize(status) }}
                    </div>
                </div>
                <div class="text-center">
                    <!-- Deadline -->
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-100">{{ deadline }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                </div>
            </div>
            <div class="flex gap-2">
                <!-- Emit -->
                <UButton icon="i-lucide-edit" variant="ghost" color="neutral" size="sm" aria-label="Edit System"
                    @click="$emit('edit')" />
                <!-- Emit -->
                <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm" aria-label="Delete System"
                    @click="$emit('delete')" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
    system: { type: String, required: true },      // System name
    entity: { type: String, required: true },      // Entity name
    budget: { type: String, required: true },      // Budget string
    priority: { type: String, default: 'low' },    // Priority: high, medium, low
    status: { type: String, default: 'active' },   // Status: active, planning, completed, etc.
    deadline: { type: String, required: true },    // Deadline date string
    icon: { type: String, default: 'i-lucide-grip-vertical' }
})

function priorityClass(priority: string) {
    switch (priority) {
        case 'high':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
        case 'medium':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
        case 'low':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
}

function statusClass(status: string) {
    switch (status) {
        case 'active':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
        case 'inprogress':
        case 'in progress':
            return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
        case 'planning':
            return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
        case 'completed':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
}

function capitalize(str: string) {
    // Special case for "inprogress" and "in progress"
    if (str.toLowerCase() === 'inprogress' || str.toLowerCase() === 'in progress') {
        return 'In Progress'
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>