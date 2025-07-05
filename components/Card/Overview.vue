<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-3">
            <div>
                <!-- Department -->
                <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ department }}</h3>
                <!-- Head -->
                <p class="text-sm text-gray-600 dark:text-gray-400">Head: {{ head }}</p>
            </div>
            <!-- Emit -->
            <UButton
                icon="i-lucide-edit"
                variant="ghost"
                color="neutral"
                size="sm"
                aria-label="Edit Department"
                @click="$emit('edit')"
            />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-users" class="w-4 h-4 text-blue-500 dark:text-blue-700" />
                <div>
                    <!-- Users -->
                    <p class="text-sm font-medium">{{ users }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Users</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-monitor" class="w-4 h-4 text-green-500 dark:text-green-700" />
                <div>
                    <!-- Devices -->
                    <p class="text-sm font-medium">{{ devices }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Devices</p>
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
    department: { type: String, required: true }, // Department name
    head: { type: String, required: true },       // Department head
    users: { type: [String, Number], required: true },    // Number of users
    devices: { type: [String, Number], required: true }   // Number of devices
})

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>