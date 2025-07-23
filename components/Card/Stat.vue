<template>
    <UCard class="hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-3">
            <UIcon :name="icon" :class="['w-8 h-8 shrink-0', iconColor]" />
            <div class="truncate">
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ label }}</p>
                <p class="text-2xl font-bold truncate">{{ value }}</p>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
    icon: { type: String, default: 'i-lucide-dollar-sign' },
    iconColor: { type: String, default: 'text-green-600 dark:text-green-400' },
    label: { type: String, default: 'Total Budget' },
    value: { type: String, default: '₱10,400,000' }
})

const uiCardConfig = {
    body: 'sm:p-4',
}
</script>