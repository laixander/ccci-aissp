<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="lg:flex justify-between items-center">
            <div class="grid gap-2 mb-2 lg:mb-0">
                <!-- Department -->
                <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ department }}</h3>
                <div class="space-x-1">
                    <UBadge v-for="(type, index) in props.typeDisplay" :key="index" :label="type" :color="typeColor(type)" size="sm" variant="soft" class="rounded-full" />
                </div>
            </div>
            <div class="grid lg:grid-cols-2 gap-2 lg:gap-6 divide-y lg:divide-none divide-gray-100 dark:divide-gray-800/50">
                <div class="flex items-center gap-2 py-2 lg:py-0">
                    <UIcon name="i-lucide-users" class="w-4 h-4 shrink-0 text-blue-500 dark:text-blue-700" />
                    <div class="flex-1 flex items-center justify-between lg:block">
                        <p class="text-sm lg:text-base font-medium order-1">{{ request }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 order-0">Request</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-layers" class="w-4 h-4 shrink-0 text-green-500 dark:text-green-700" />
                    <div class="flex-1 flex items-center justify-between lg:block">
                        <p class="text-sm lg:text-base font-medium order-1">{{ quantity }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 order-0">Quantity</p>
                    </div>
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type BadgeType = 'Hardware' | 'Software' | 'Infrastructure' | 'Training'

interface Props {
    department: string
    typeDisplay: BadgeType[]
    head: string
    request: number
    quantity: number
}

const props = defineProps<Props>()

const typeColorMap = {
    Hardware: 'primary',
    Software: 'violet',
    Infrastructure: 'orange',
    Training: 'success'
} as const

const typeColor = (type: keyof typeof typeColorMap) => typeColorMap[type] || 'neutral'

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>