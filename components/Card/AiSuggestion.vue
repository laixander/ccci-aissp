<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                    <span v-if="category" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold
              text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-800/50">
                        {{ category }}
                    </span>

                    <span v-if="priority" class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        :class="priorityClass">
                        {{ priority }}
                    </span>

                </div>
                <h3 class="font-medium text-gray-900 mb-1 dark:text-white">{{ title }}</h3>
                <p class="text-sm text-gray-600 mb-2 dark:text-gray-400">{{ description }}</p>
                <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span v-if="section">Section: {{ section }}</span>
                    <span v-if="date">Generated: {{ date }}</span>
                </div>
            </div>
            <div class="flex gap-2">
                <UButton v-if="onApply" label="Apply" variant="outline" color="neutral" size="lg" @click="onApply" />
                <UButton v-if="onDismiss" label="Dismiss" variant="ghost" color="neutral" size="lg"
                    @click="onDismiss" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    title: string
    description: string
    category?: string
    priority?: string
    section?: string
    date?: string
    onApply?: () => void
    onDismiss?: () => void
}>()

const priorityClass = computed(() => {
    switch (props.priority) {
        case 'High':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        case 'Low':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
})

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>