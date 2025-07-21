<template>
    <CardRow hasHover tightSpace>
        <!-- File icon -->
        <UIcon :name="fileIcon" class="w-8 h-8 text-gray-500 dark:text-gray-400" />

        <DynamicGrid :cols="1" :md-cols="5" class="items-center w-full">
            <!-- File name and description -->
            <div>
                <p class="font-medium text-gray-900 dark:text-gray-100 truncate">{{ file.name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ file.description }}</p>
            </div>

            <!-- File type badge -->
            <div class="text-center">
                <UBadge :label="file.type.toUpperCase()" :color="typeColor" class="rounded-full" />
            </div>

            <!-- Author and date -->
            <div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ file.author }}</p>
                <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <UIcon name="i-lucide-calendar" class="w-3 h-3" />
                    <span>{{ file.date }}</span>
                </div>
            </div>

            <!-- File size and downloads -->
            <div class="text-center">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ file.size }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ file.downloads }} downloads</p>
            </div>

            <!-- Status badge -->
            <div class="text-center">
                <UBadge :label="file.status" :color="statusColor" variant="soft" class="rounded-full" />
            </div>
        </DynamicGrid>

        <IconActions
            :icons="actions"
            @view="$emit('view')"
            @download="$emit('download')"
            @delete-confirmed="$emit('delete-confirmed')"
        />
    </CardRow>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type UBadgeColor = 'error' | 'primary' | 'success' | 'warning' | 'secondary' | 'neutral' | 'info' | 'violet' | 'orange' | 'purple'

interface FileItem {
    id: string
    name: string
    description: string
    type: string
    author: string
    date: string
    size: string
    downloads: number
    status: string
}

const props = defineProps<{
    file: FileItem
    actions?: ('view' | 'download' | 'delete')[]
}>()

const actions = computed(() => props.actions ?? ['view', 'download', 'delete'])

const fileIcon = computed(() => {
    switch (props.file.type.toLowerCase()) {
        case 'pdf':
        case 'docx':
            return 'i-lucide-file-text'
        case 'xlsx':
            return 'i-lucide-file-spreadsheet'
        case 'pptx':
            return 'i-lucide-file-presentation'
        case 'zip':
            return 'i-lucide-file-archive'
        default:
            return 'i-lucide-file'
    }
})

const typeColorMap: Record<string, UBadgeColor> = {
    pdf: 'error',
    docx: 'secondary',
    xlsx: 'success'
}

const typeColor = computed<UBadgeColor>(() => {
    return typeColorMap[props.file.type.toLowerCase()] ?? 'neutral'
})

const statusColorMap: Record<string, UBadgeColor> = {
    completed: 'success',
    processing: 'warning',
    failed: 'error'
}

const statusColor = computed<UBadgeColor>(() => {
    return statusColorMap[props.file.status.toLowerCase()] ?? 'neutral'
})

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>