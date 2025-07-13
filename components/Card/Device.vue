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
                    <UBadge :label="status" :color="statusColor" variant="soft" class="rounded-full" />
                </div>
                <div class="flex gap-2 justify-end">
                    <UButton icon="i-lucide-edit" variant="ghost" color="neutral" size="sm" aria-label="Edit Device"
                        @click="$emit('edit')" />
                    <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm" aria-label="Delete Device"
                        @click="$emit('delete')" />
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    user: string
    department: string
    deviceType: string
    deviceName: string
    status: 'Active' | 'Inactive' | 'Repair' | 'In Repair' | 'Retired'
}

const props = defineProps<Props>()

// Icon per device type
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

// Status color map
const statusColorMap = {
    Active: 'success',
    Inactive: 'secondary',
    Repair: 'warning',
    'In Repair': 'warning',
    Retired: 'error'
} as const

const statusColor = computed(() => statusColorMap[props.status] || 'neutral')

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>
