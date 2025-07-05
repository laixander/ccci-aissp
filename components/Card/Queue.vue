<template>
    <UCard :ui="uiCardConfig">
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium text-gray-800 dark:text-gray-200">{{ name }}</p>
                <div class="flex items-center gap-2 mt-1">
                    <UIcon :name="icon" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="text-sm text-gray-600 dark:text-gray-500">{{ date }}</span>
                </div>
            </div>
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
                :class="[priorityBg, priorityText]">
                {{ priorityLabel }}
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
    name: { type: String, default: 'College of Arts & Sciences' },
    date: { type: String, default: 'Dec 15, 2024' },
    icon: { type: String, default: 'i-lucide-calendar' },
    priority: { type: String, default: 'high' }
})

const priorityMap: Record<string, { bg: string; text: string; label: string }> = {
    high: { bg: 'bg-red-500 dark:bg-red-700', text: 'text-white', label: 'high' },
    medium: { bg: 'bg-yellow-500 dark:bg-yellow-700', text: 'text-white', label: 'medium' },
    low: { bg: 'bg-green-500 dark:bg-green-700', text: 'text-white', label: 'low' }
}

const priorityBg = priorityMap[props.priority]?.bg || priorityMap.high!.bg
const priorityText = priorityMap[props.priority]?.text || priorityMap.high!.text
const priorityLabel = priorityMap[props.priority]?.label || priorityMap.high!.label

const uiCardConfig = {
    body: 'sm:p-3'
}
</script>