<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
            <UIcon v-if="asCheckbox"
                :name="checked ? 'i-lucide-circle-check-big' : 'i-lucide-circle'"
                :class="['size-5', checked ? 'text-primary' : 'text-gray-700']"
            />
            <UIcon v-if="!asCheckbox" :name="icon" class="w-6 h-6 text-gray-300 dark:text-gray-800 cursor-grab handle" />
            <div class="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-4 items-center">
                <div class="flex items-center gap-2">
                    <!-- Toggle button for mobile -->
                    <UButton :icon="showDetails ? 'i-lucide-square-minus' : 'i-lucide-square-plus'" variant="ghost" color="neutral" class="lg:hidden cursor-pointer"
                        @click="showDetails = !showDetails" v-show="!hideToggle" />
                    <div class="w-full truncate">
                        <h3 class="font-medium text-gray-800 dark:text-gray-100 truncate">{{ system }}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ entity }}</p>
                    </div>
                </div>

                <!-- Extra fields shown only on large or toggle on small -->
                <!-- Budget -->
                <div class="flex justify-between items-center lg:block lg:text-center lg:border-none border-b border-gray-100 dark:border-gray-800/50 lg:pb-0 pb-2" v-show="forceShow || showDetails || isLargeScreen">
                    <p class="font-semibold text-gray-800 dark:text-gray-100 order-1 truncate">{{ budget }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 order-0">Budget</p>
                </div>

                <!-- Priority -->
                <div class="flex justify-between items-center lg:block lg:text-center lg:border-none border-b border-gray-100 dark:border-gray-800/50 lg:pb-0 pb-2" v-show="forceShow || showDetails || isLargeScreen">
                    <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden">Priority</p>
                    <UBadge :label="priorityDisplay" :color="priorityColor" variant="soft" class="rounded-full" />
                </div>

                <!-- Status -->
                <div class="flex justify-between items-center lg:block lg:text-center lg:border-none border-b border-gray-100 dark:border-gray-800/50 lg:pb-0 pb-2" v-show="forceShow || showDetails || isLargeScreen">
                    <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden">Status</p>
                    <UBadge :label="statusDisplay" :color="statusColor" variant="soft" class="rounded-full" />
                </div>

                <!-- Deadline -->
                <div class="flex justify-between items-center lg:block lg:text-center" v-show="forceShow || showDetails || isLargeScreen">
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-100 order-1 truncate">{{ deadline }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 order-0">Deadline</p>
                </div>
            </div>

            <!-- Action buttons -->
            <div v-if="!asCheckbox" :class="[showDetails ? 'grid' : 'flex']" class="lg:flex items-center gap-2">
                <UButton icon="i-lucide-edit" variant="ghost" color="neutral" size="sm" aria-label="Edit System"
                    @click="$emit('edit')" />
                <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm" aria-label="Delete System"
                    @click="$emit('delete')" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

interface Props {
    system: string
    entity: string
    budget: string
    priority: 'high' | 'medium' | 'low'
    status: 'active' | 'in progress' | 'planning' | 'completed'
    deadline: string
    icon?: string
    forceShow?: boolean
    hideToggle?: boolean
    asCheckbox?: boolean
    checked?: boolean
}

const props = defineProps<Props>()

// show details in mobile
const showDetails = ref(false)
const isLargeScreen = useMediaQuery('(min-width: 1024px)') // This detects if the screen is large (e.g., lg breakpoint at 1024px)
// watch(isLargeScreen, (value) => {
//     if (value) {
//         showDetails.value = false
//     }
// })

// Badge color mappings
const priorityColorMap = {
    high: 'error',
    medium: 'warning',
    low: 'success'
} as const

const statusColorMap = {
    active: 'secondary',
    inprogress: 'orange',
    'in progress': 'orange',
    planning: 'violet',
    completed: 'success'
} as const

const priorityColor = computed(() => priorityColorMap[props.priority] || 'neutral')
const statusColor = computed(() => statusColorMap[props.status] || 'neutral')

// Capitalized display values
const priorityDisplay = computed(() => capitalize(props.priority))
const statusDisplay = computed(() => capitalize(props.status))

function capitalize(str: string) {
    const lower = str.toLowerCase()
    if (lower === 'inprogress' || lower === 'in progress') return 'In Progress'
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const icon = computed(() => props.icon || 'i-lucide-grip-vertical')

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>