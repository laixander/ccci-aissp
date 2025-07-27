<template>
    <UCard variant="soft" :ui="uiCardConfig">
        <div class="flex items-center gap-4">
            <template v-if="loading">
                <USkeleton class="w-8 h-8 rounded-full" />
                <div class="flex-1 space-y-1">
                    <USkeleton class="w-3/4 h-4" />
                    <USkeleton class="w-1/2 h-3" />
                </div>
                <USkeleton class="w-16 h-3" />
            </template>

            <template v-else>
                <UChip standalone inset size="xl" :color="typeColor" />
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ title }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-500">{{ description }}</p>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400 w-20 text-right">{{ timeAgo }}</span>
            </template>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import type { ActivityCardProps } from '~/types/cards'
import { useSimulatedLoading } from '~/composables/useSimulatedLoading'

const props = defineProps<ActivityCardProps>()

const { loading } = useSimulatedLoading(2000)

const uiCardConfig = {
    body: 'sm:p-3'
}
</script>