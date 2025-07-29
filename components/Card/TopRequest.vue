<template>
    <CardRow hasHover tightSpace>
        <UIcon name="i-lucide-trending-up" class="w-8 h-8 text-purple-600" />

        <DynamicGrid :cols="1" :lg-cols="4" gap="gap-2" class="flex-1 lg:gap-4 items-center">
            <div class="flex items-center gap-2">
                <!-- Toggle button for mobile -->
                <UButton :icon="showDetails ? 'i-lucide-square-minus' : 'i-lucide-square-plus'" variant="ghost"
                    color="neutral" class="lg:hidden cursor-pointer" @click="showDetails = !showDetails"
                    v-show="!hideToggle" />
                <div class="w-full truncate">
                    <p class="font-medium text-default truncate">{{ request }}</p>
                    <p class="text-sm text-muted">{{ count }} requests</p>
                </div>
            </div>

            <div class="flex items-center gap-1 lg:border-none border-b border-gray-100 dark:border-gray-800/50 lg:pb-0 pb-2"
                v-show="forceShow || showDetails || isLargeScreen">
                <UIcon name="i-lucide-philippine-peso" class="hidden lg:flex w-4 h-4 text-green-600" />
                <div class="flex-1 flex items-center justify-between lg:block">
                    <p class="text-sm lg:text-base font-medium text-default order-1">₱{{ budget.toLocaleString('en-PH') }}</p>
                    <p class="text-xs text-muted order-0">Budget</p>
                </div>
            </div>

            <div class="flex justify-between items-center lg:block lg:border-none border-b border-gray-100 dark:border-gray-800/50 lg:pb-0 pb-2"
                v-show="forceShow || showDetails || isLargeScreen">
                <p class="text-sm lg:text-base font-medium order-1"
                    :class="trend >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'">
                    {{ trend > 0 ? `+${trend}%` : `${trend}%` }}
                </p>
                <p class="text-xs text-muted order-0">Trend</p>
            </div>

            <div v-if="priority" class="flex justify-between items-center lg:block"
                v-show="forceShow || showDetails || isLargeScreen">
                <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden">Priority</p>
                <UBadge :label="priority" variant="soft" :color="priorityColor" class="rounded-full" />
            </div>
        </DynamicGrid>

        <IconActions :icons="actions" @view="$emit('view')" @delete-confirmed="$emit('delete-confirmed')"
            :class="[showDetails ? 'grid' : 'flex']" class="lg:flex items-center gap-2" />
    </CardRow>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
const props = defineProps<{
    request: string
    count: number
    budget: number
    trend: number
    priority?: 'High' | 'Medium' | 'Low'
    actions?: ('view' | 'delete')[]
    forceShow?: boolean
    hideToggle?: boolean
}>()

defineEmits(['view', 'delete-confirmed'])

const showDetails = ref(false)
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const priorityColor = computed(() => {
    switch (props.priority) {
        case 'High':
            return 'error'
        case 'Medium':
            return 'warning'
        case 'Low':
            return 'success'
        default:
            return 'neutral'
    }
})
</script>
