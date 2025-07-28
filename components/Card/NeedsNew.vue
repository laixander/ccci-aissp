<template>
    <UCard :ui="uiCardConfig" class="shadow-sm">
        <!-- Header image placeholder -->
        <template #header>
            <Placeholder class="size-full border-none h-[160px]" />
        </template>

        <!-- Top badges and menu -->
        <div class="flex justify-between">
            <div class="flex items-center gap-1">
                <UBadge v-if="priority" :label="priority" variant="soft" :color="priorityColor" class="rounded-full" />
                <UBadge v-if="type" :label="type" variant="soft" color="neutral" class="rounded-full" />
            </div>
            <UDropdownMenu :items="menuItems" :content="{ align: 'start', side: 'bottom', sideOffset: 8 }">
                <UButton icon="i-lucide-ellipsis" color="neutral" variant="ghost" />
            </UDropdownMenu>
        </div>

        <!-- Title & description -->
        <h4 class="text-lg text-default font-semibold tracking-tight truncate">
            {{ title }}
        </h4>
        <p class="text-sm text-muted text-pretty truncate line-clamp-2">
            {{ description }}
        </p>

        <!-- Dynamic tags (system, document only) -->
        <div v-if="filteredTags.length" class="space-x-1 pt-4">
            <UBadge v-for="(tag, index) in filteredTags" :key="index" :icon="tagIcon(tag.type)" :label="tag.label"
                variant="soft" color="neutral" class="rounded-full" />
        </div>

        <!-- Footer: Budget info -->
        <template #footer>
            <div class="grid grid-cols-2 items-center font-medium text-sm divide-x divide-gray-200 dark:divide-gray-800">
                <div class="bg-elevated/50 text-center">
                    <span class="block text-muted px-4 py-2.5 truncate">Estimated Budget:</span>
                </div>
                <div class="text-center">
                    <span class="block text-default px-4 py-2.5 truncate">{{ budget }}</span>
                </div>
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

// Props
const props = defineProps<{
    title: string
    description: string
    priority?: 'Low' | 'Medium' | 'High'
    type?: string
    budget: string
    tags?: { type: 'system' | 'document'; label: string }[]
}>()

// Dropdown menu actions
const menuItems: DropdownMenuItem[][] = [
    [
        { label: 'Edit', icon: 'i-lucide-square-pen' },
        { label: 'Duplicate', icon: 'i-lucide-copy' }
    ],
    [
        { label: 'Delete', icon: 'i-lucide-trash-2', color: 'error' }
    ]
]

// Priority color map
const priorityColor = computed(() => {
    switch (props.priority) {
        case 'High': return 'error'
        case 'Medium': return 'warning'
        case 'Low': return 'success'
        default: return 'neutral'
    }
})

// Icon map for tags
const tagIcon = (type: 'system' | 'document') => {
    return type === 'system' ? 'i-lucide-server' : 'i-lucide-file-text'
}

// Only allow system & document types
const filteredTags = computed(() =>
    props.tags?.filter(tag =>
        tag.type === 'system' || tag.type === 'document'
    ) ?? []
)

const uiCardConfig = {
    root: 'flex flex-col h-full',
    header: 'p-0 sm:p-0',
    body: 'sm:p-4 space-y-2 flex-1',
    footer: 'p-0 sm:p-0'
}
</script>