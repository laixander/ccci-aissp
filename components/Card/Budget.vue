<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ title }}</h3>
                    <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
                        :class="statusClass">
                        {{ status }}
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Total Budget</p>
                        <p class="font-medium dark:text-gray-100">₱{{ totalBudget.toLocaleString('en-PH') }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">MOOE</p>
                        <p class="font-medium text-purple-700 dark:text-purple-300">₱{{ mooe.toLocaleString('en-PH') }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">CO</p>
                        <p class="font-medium text-orange-700 dark:text-orange-300">₱{{ co.toLocaleString('en-PH') }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Last Modified</p>
                        <p class="font-medium dark:text-gray-100">{{ lastModified }}</p>
                    </div>
                </div>
            </div>
            <div class="flex gap-2">
                <UButton icon="i-lucide-edit" variant="ghost" color="neutral" size="sm" aria-label="Edit"
                    @click="$emit('edit')" />
                <UButton icon="i-lucide-download" variant="ghost" color="neutral" size="sm" aria-label="Download"
                    @click="$emit('download')" />
                <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm" aria-label="Delete"
                    @click="$emit('delete')" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    title: { type: String, required: true },
    status: { type: String, required: true },
    totalBudget: { type: Number, required: true },
    mooe: { type: Number, required: true },
    co: { type: Number, required: true },
    lastModified: { type: String, required: true }
})

// Define status class mapping, adding dark mode equivalents
const statusClassMap: Record<string, string> = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Under Review': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
}

const statusClass = computed(() => statusClassMap[props.status] ?? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200')

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>