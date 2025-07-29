<template>
    <UCard :ui="uiCardConfig" class="shadow-sm hover:shadow-md transition-shadow" @click="navigate">
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
            <UDropdownMenu :items="menuItems" :content="{ align: 'end', side: 'bottom', sideOffset: 8 }" size="sm"
                :ui="{ itemLeadingIcon: 'size-4' }">
                <UButton icon="i-lucide-ellipsis" color="neutral" variant="ghost" @click.stop="null" />
            </UDropdownMenu>
        </div>

        <!-- Title & description -->
        <h4 class="text-lg text-default font-semibold tracking-tight truncate">
            {{ title }}
        </h4>
        <p class="text-sm text-muted text-pretty truncate line-clamp-2">
            {{ description }}
        </p>

        <!-- Optional Metadata -->
        <div class="hidden lg:flex flex-col gap-1.5 text-sm text-muted pt-4 *:flex *:items-center *:gap-1">
            <div v-if="entity">
                <UIcon name="i-lucide-building" class="size-4 shrink-0" />
                {{ entity }}
            </div>
            <div v-if="author">
                <UIcon name="i-lucide-user" class="size-4 shrink-0" />
                {{ author }}
            </div>
            <div v-if="date">
                <UIcon name="i-lucide-calendar" class="size-4 shrink-0" />
                {{ date }}
            </div>
        </div>

        <!-- Dynamic tags (system, document only) -->
        <div v-if="filteredTags.length" class="space-x-1 pt-4">
            <UBadge v-for="(tag, index) in filteredTags" :key="index" :icon="tagIcon(tag.type)" :label="tag.label"
                variant="outline" color="neutral" class="rounded-full" />
        </div>

        <!-- Footer: Budget info -->
        <template #footer>
            <div
                class="grid grid-cols-2 items-center font-medium text-sm divide-x divide-gray-200 dark:divide-gray-800">
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
    to?: string
    entity?: string
    author?: string
    date?: string
}>()

// Navigation
const router = useRouter()
const navigate = () => {
    if (props.to) router.push(props.to)
}

// Menu
const menuItems: DropdownMenuItem[][] = [
    [
        { label: 'Edit', icon: 'i-lucide-square-pen' },
        { label: 'Duplicate', icon: 'i-lucide-copy' }
    ],
    [
        { label: 'Delete', icon: 'i-lucide-trash-2', color: 'error' }
    ]
]

// Priority color logic
const priorityColor = computed(() => {
    switch (props.priority) {
        case 'High': return 'error'
        case 'Medium': return 'warning'
        case 'Low': return 'success'
        default: return 'neutral'
    }
})

// Tag icon mapping
const tagIcon = (type: 'system' | 'document') => {
    return type === 'system' ? 'i-lucide-server' : 'i-lucide-file-text'
}

// Filter allowed tags
const filteredTags = computed(() =>
    props.tags?.filter(tag =>
        tag.type === 'system' || tag.type === 'document'
    ) ?? []
)

// UI card config
const uiCardConfig = {
    root: 'flex flex-col h-full',
    header: 'p-0 sm:p-0',
    body: 'sm:p-4 space-y-2 flex-1',
    footer: 'p-0 sm:p-0'
}
</script>