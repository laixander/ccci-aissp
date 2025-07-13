<template>
    <UCard :ui="uiCardConfig" class="hover:shadow-md">
        <div class="flex items-center justify-between">
            <div>
                <div class="flex items-center gap-2">
                    <p class="font-medium text-gray-900 dark:text-gray-100">{{ name }}</p> 
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Model: {{ model }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">API Endpoint: {{ endpoint }}</p>
            </div>
            <div class="flex items-center gap-3">
                <USwitch :model-value="isActive" size="lg" label="Active" :default-value="isActive" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
defineProps({
    name: { type: String, default: '' },
    model: { type: String, default: '' },
    endpoint: { type: String, default: '' },
    isActive: { type: Boolean, default: true }
})

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>