<template>
    <UCard :ui="uiCardConfig" class="hover:shadow-md transition-shadow">
        <div class="space-y-4">
            <div class="flex items-start justify-between">
                <div class="space-y-1">
                    <div class="flex items-center gap-3">
                        <h3 class="font-semibold tracking-tight text-lg text-default">{{ title }}</h3>
                        <UBadge :label="priorityDisplay" :color="priorityColor" variant="soft" class="rounded-full" />
                        <UBadge :label="typeDisplay" :color="typeColor" class="rounded-full" />
                    </div>
                    <p class="text-sm text-muted">
                        {{ description }}
                    </p>
                </div>
                <div class="flex items-center space-x-2">
                    <UTooltip text="Edit Template">
                        <UButton icon="i-lucide-square-pen" color="neutral" variant="ghost" size="sm"
                            @click="$emit('edit')" />
                    </UTooltip>
                    <UTooltip text="Duplicate Template">
                        <UButton icon="i-lucide-copy" color="neutral" variant="ghost" size="sm"
                            @click="$emit('copy')" />
                    </UTooltip>

                    <!-- Delete Confirmation Modal -->
                    <Confirmation @delete="$emit('delete')">
                        <template #action>
                            <UTooltip text="Delete Template">
                                <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="sm"
                                    aria-label="Delete" />
                            </UTooltip>
                        </template>
                        <template #message>
                            <p class="text-gray-800 dark:text-gray-100 font-medium">
                                Are you sure you want to delete this <span class="font-extrabold text-primary">{{ title
                                    }}</span> section?
                            </p>
                        </template>
                    </Confirmation>
                </div>
            </div>

            <div class="flex items-center justify-between">

                <div class="flex items-center gap-2">
                    <!-- <UIcon :name="statusIcon" class="h-4 w-4" :class="statusIconClass" /> -->
                    <!-- <UBadge :label="statusDisplay" :color="statusColor" variant="soft" class="rounded-full" /> -->

                    <UBadge v-for="(tag, index) in tags" :key="index" :label="tag" variant="soft" color="neutral"
                        class="rounded-full" />
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-sm">
                    <div class="flex items-center gap-1 text-muted">
                        <UIcon name="i-lucide-building" class="w-4 h-4" />
                        {{ entity }}
                    </div>
                    <div class="flex items-center gap-1 text-muted">
                        <UIcon name="i-lucide-user" class="w-4 h-4" />
                        {{ author }}
                    </div>
                    <div class="flex items-center gap-1 text-muted">
                        <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                        {{ date }}
                    </div>
                </div>
                <div class="flex items-center gap-2">

                    <div class="text-xs inline-flex ring ring-accented rounded-sm">
                        <div class="bg-elevated/50 rounded-l-sm flex border-r border-accented">
                            <div class="flex content-center items-center justify-between">
                                <span class="block font-medium text-muted px-2 py-1.5">Total Budget:</span>
                            </div>
                        </div>
                        <div class="relative mt-0">
                            <div class="relative inline-flex items-center">
                                <span class="block font-medium text-default px-2 py-1.5">{{ budget }}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    title: string
    priority: 'High' | 'Medium' | 'Low'
    type: 'Hardware' | 'Software' | 'Infrastructure' | 'Training'
    description: string
    entity: string
    date: string
    author: string
    budget: string
    tags: string[]
    // status: 'Requested' | 'In Progress' | 'In Review' | 'Approved'
}

const props = defineProps<Props>()

// Mappings
const priorityColorMap = {
    High: 'error',
    Medium: 'warning',
    Low: 'success'
} as const

const typeColorMap = {
    Hardware: 'primary',
    Software: 'violet',
    Infrastructure: 'orange',
    Training: 'success'
} as const

const statusColorMap = {
    Requested: 'primary',
    'In Progress': 'warning',
    'In Review': 'secondary',
    Approved: 'success'
} as const

const statusIconMap = {
    Requested: 'i-lucide-mail',
    'In Progress': 'i-lucide-clock',
    'In Review': 'i-lucide-search',
    Approved: 'i-lucide-check-circle'
} as const

const statusIconColorMap = {
    Requested: 'text-primary',
    'In Progress': 'text-warning',
    'In Review': 'text-secondary',
    Approved: 'text-success'
} as const

// Computed Color & Display
const priorityDisplay = computed(() => props.priority)
const typeDisplay = computed(() => props.type)
// const statusDisplay = computed(() => props.status)

const priorityColor = computed(() => priorityColorMap[props.priority] || 'neutral')
const typeColor = computed(() => typeColorMap[props.type] || 'neutral')
// const statusColor = computed(() => statusColorMap[props.status] || 'neutral')

// const statusIcon = computed(() => statusIconMap[props.status] || 'i-lucide-help-circle')
// const statusIconClass = computed(() => statusIconColorMap[props.status] || 'text-neutral')

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>
