<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
            <UIcon :name="icon" class="w-8 h-8 text-gray-500 dark:text-gray-400" />
            <div class="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                    <!-- End User -->
                    <p class="font-medium text-gray-800 dark:text-gray-100">{{ user }}</p>
                    <!-- Department -->
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ department }}</p>
                </div>
                <div>
                    <!-- Device Type -->
                    <p class="font-medium text-gray-800 dark:text-gray-100">{{ deviceType }}</p>
                    <!-- Device Name -->
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ deviceName }}</p>
                </div>
                <div>
                    <!-- Status -->
                    <div
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        :class="statusClass">
                        {{ statusDisplay }}
                    </div>
                </div>
                <div class="flex gap-2 justify-end">
                    <!-- Emit -->
                    <UButton icon="i-lucide-edit" variant="ghost" color="neutral" size="sm" aria-label="Edit Device"
                        @click="$emit('edit')" />
                    <!-- Emit -->
                    <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm" aria-label="Delete Device"
                        @click="$emit('delete')" />
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    user: { type: String, required: true },         // End user name
    department: { type: String, required: true },   // Department name
    deviceType: { type: String, required: true },   // Device type (e.g., Laptop, Desktop)
    deviceName: { type: String, required: true },   // Device name/model
    status: { type: String, required: true },       // Status (e.g., Active, Inactive, Repair)
})

// Dynamic icon based on deviceType
const icon = computed(() => {
    switch (props.deviceType.toLowerCase()) {
        case 'laptop':
            return 'i-lucide-laptop-minimal'
        case 'desktop':
            return 'i-lucide-monitor'
        case 'tablet':
            return 'i-lucide-tablet'
        case 'mobile':
            return 'i-lucide-smartphone'
        default:
            return 'i-lucide-monitor'
    }
})

const statusClass = computed(() => {
    switch (props.status.toLowerCase()) {
        case 'active':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
        case 'inactive':
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
        case 'repair':
        case 'in repair':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
        case 'retired':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
})

const statusDisplay = computed(() => {
    if (props.status.toLowerCase() === 'in repair' || props.status.toLowerCase() === 'repair') return 'In Repair'
    return props.status.charAt(0).toUpperCase() + props.status.slice(1)
})

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>