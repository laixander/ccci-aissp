<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <UIcon v-if="asCheckbox"
                :name="checked ? 'i-lucide-circle-check-big' : 'i-lucide-circle'"
                :class="['size-5', checked ? 'text-primary' : 'text-gray-700']"
            />
            <div :class="['flex-1', asCheckbox ? 'grid grid-cols-3 items-center' : 'space-y-2']">
                <div class="flex items-center gap-3">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ title }}</h3>
                    <UBadge :label="status" :color="statusColor" variant="soft" class="rounded-full" />
                </div>
                <div :class="['grid grid-cols-2 gap-4 text-sm', asCheckbox ? 'col-span-2 md:grid-cols-3' : 'md:grid-cols-4']">
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
                    <div v-if="lastModified">
                        <p class="text-gray-600 dark:text-gray-400">Last Modified</p>
                        <p class="font-medium dark:text-gray-100">{{ lastModified }}</p>
                    </div>
                </div>
            </div>
            <div v-if="!asCheckbox" class="flex gap-2">
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

interface Props {
    title: string
    status: 'Active' | 'Draft' | 'Under Review'
    totalBudget: number
    mooe: number
    co: number
    lastModified?: string
    asCheckbox?: boolean
    checked?: boolean
}

const props = defineProps<Props>()

const statusColorMap = {
    Active: 'success',
    Draft: 'warning',
    'Under Review': 'secondary',
} as const

const statusColor = computed(() => {
    return props.status ? statusColorMap[props.status] : 'neutral'
})

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>