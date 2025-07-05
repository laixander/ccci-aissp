<template>
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCard :ui="uiCardConfig">
                <div class="flex items-center gap-2 mb-3">
                    <UIcon name="i-lucide-database" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 class="font-medium text-gray-800 dark:text-gray-100">Financial Management System (FMS)</h4>
                </div>
                <div class="space-y-3">
                    <UFormField label="API Endpoint" size="lg">
                        <UInput placeholder="https://fms.university.edu.ph/api" class="w-full" />
                    </UFormField>
                    <UFormField label="API Key" size="lg">
                        <UInput placeholder="Enter FMS API key" class="w-full" />
                    </UFormField>
                    <USwitch size="lg" label="Enable FMS Integration" />
                </div>
            </UCard>
            <UCard :ui="uiCardConfig">
                <div class="flex items-center gap-2 mb-3">
                    <UIcon name="i-lucide-database" class="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h4 class="font-medium text-gray-800 dark:text-gray-100">Asset Management System (AMS)</h4>
                </div>
                <div class="space-y-3">
                    <UFormField label="API Endpoint" size="lg">
                        <UInput placeholder="https://ams.university.edu.ph/api" class="w-full" />
                    </UFormField>
                    <UFormField label="API Key" size="lg">
                        <UInput placeholder="Enter AMS API key" class="w-full" />
                    </UFormField>
                    <USwitch size="lg" label="Enable AMS Integration" />
                </div>
            </UCard>
        </div>
        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-950 dark:border-yellow-800">
            <h4 class="font-medium text-yellow-800 mb-2 dark:text-yellow-200">Integration Status</h4>
            <div class="space-y-2 text-sm">
            <div class="flex justify-between">
                <span class="dark:text-yellow-100">FMS Connection:</span>
                <span class="text-red-600 dark:text-red-400">Disconnected</span>
            </div>
            <div class="flex justify-between">
                <span class="dark:text-yellow-100">AMS Connection:</span>
                <span class="text-green-600 dark:text-green-400">Connected</span>
            </div>
            <div class="flex justify-between">
                <span class="dark:text-yellow-100">Last Sync:</span>
                <span class="dark:text-yellow-100">2024-12-01 08:30</span>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const uiCardConfig = {
    body: 'sm:p-4'
}
</script>