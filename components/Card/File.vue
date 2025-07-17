<template>
    <UCard :ui="uiCardConfig" class="hover:shadow-sm transition-shadow">
        <div class="flex items-center gap-3">
            <UIcon :name="computedIcon" class="w-8 h-8" :class="computedIconColor" />
            <div class="flex-1">
                <slot>
                    <p class="font-medium text-default">{{ name }}</p>
                    <p class="text-sm text-muted">{{ size }}</p>
                </slot>
            </div>
            <slot name="actions">
                <div class="flex gap-4">
                    <UButton icon="i-lucide-eye" variant="ghost" color="neutral" size="sm" @click="emit('view')" />
                    <UButton icon="lucide-download" variant="ghost" color="neutral" size="sm"
                        @click="emit('download')" />
                </div>
            </slot>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    name: string
    size: string
    icon?: string
    iconColor?: string
    fileType?: string
}>(), {
    icon: '',
    iconColor: '',
    fileType: ''
})

const emit = defineEmits<{
    (e: 'view'): void
    (e: 'download'): void
}>()

const fileTypeIconMap: Record<string, string> = {
    pdf: 'i-lucide-file-text',
    doc: 'i-lucide-file-text',
    docx: 'i-lucide-file-text',
    xls: 'i-lucide-file-spreadsheet',
    xlsx: 'i-lucide-file-spreadsheet',
    jpg: 'i-lucide-file-image',
    jpeg: 'i-lucide-file-image',
    png: 'i-lucide-file-image',
    zip: 'i-lucide-file-archive',
    rar: 'i-lucide-file-archive'
}

const fileTypeColorMap: Record<string, string> = {
    pdf: 'text-red-600 dark:text-red-400',
    doc: 'text-blue-600 dark:text-blue-400',
    docx: 'text-blue-600 dark:text-blue-400',
    xls: 'text-green-600 dark:text-green-400',
    xlsx: 'text-green-600 dark:text-green-400',
    jpg: 'text-yellow-600 dark:text-yellow-400',
    jpeg: 'text-yellow-600 dark:text-yellow-400',
    png: 'text-yellow-600 dark:text-yellow-400',
    zip: 'text-gray-600 dark:text-gray-400',
    rar: 'text-gray-600 dark:text-gray-400'
}

const computedIcon = computed(() => {
    if (props.icon) return props.icon
    const ext = props.fileType?.toLowerCase() || ''
    return fileTypeIconMap[ext] || 'i-lucide-file'
})

const computedIconColor = computed(() => {
    if (props.iconColor) return props.iconColor
    const ext = props.fileType?.toLowerCase() || ''
    return fileTypeColorMap[ext] || 'text-blue-600 dark:text-blue-400'
})

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>