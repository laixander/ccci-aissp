<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-3">
            <div class="space-y-2">
                <!-- Department -->
                <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ department }}</h3>
                <div class="flex items-center gap-2">
                    <UBadge v-for="(type, index) in props.typeDisplay" :key="index" :label="type" :color="typeColor(type)" class="rounded-full" />
                </div>
            </div>
            <!-- Emit -->
            <!-- <UButton
                icon="i-lucide-edit"
                variant="ghost"
                color="neutral"
                size="sm"
                aria-label="Edit Department"
                @click="$emit('edit')"
            /> -->
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-users" class="w-4 h-4 text-blue-500 dark:text-blue-700" />
                <div>
                    <p class="text-sm font-medium">{{ request }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Request</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-monitor" class="w-4 h-4 text-green-500 dark:text-green-700" />
                <div>
                    <p class="text-sm font-medium">{{ quantity }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Quantity</p>
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