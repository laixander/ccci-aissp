<template>
  <UCard :ui="uiCardConfig" class="hover:shadow-md transition-shadow">
    <div class="flex items-center gap-4">
      <!-- File icon -->
      <UIcon :name="fileIcon" class="w-8 h-8 text-gray-600 dark:text-gray-300" />

      <!-- File details grid -->
      <div class="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
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
      </div>

      <!-- Action buttons -->
      <div class="flex gap-2">
        <UButton icon="i-lucide-eye" variant="ghost" color="neutral" size="sm" aria-label="View"
          @click="emit('view', file.id)" />
        <UButton icon="i-lucide-download" variant="ghost" color="neutral" size="sm" aria-label="Download"
          @click="emit('download', file.id)" />
        <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm" aria-label="Delete"
          @click="emit('delete', file.id)" />
      </div>
    </div>
  </UCard>
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
}>()

const emit = defineEmits<{
  (e: 'view', id: string): void
  (e: 'download', id: string): void
  (e: 'delete', id: string): void
}>()

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