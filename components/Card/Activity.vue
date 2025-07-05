<template>
    <UCard variant="soft" :ui="uiCardConfig">
        <div class="flex items-center gap-4">
            <div :class="['w-2 h-2 rounded-full', statusColor]"></div>
            <div class="flex-1">
                <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ title }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-500">{{ description }}</p>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ timeAgo }}</span>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
    title: { type: String, default: 'ISSP approved' },
    description: { type: String, default: 'College of Engineering' },
    timeAgo: { type: String, default: '2 hours ago' },
    statusColor: { type: String, default: 'bg-green-500' }
})

const uiCardConfig = {
    body: 'sm:p-3'
}
</script>