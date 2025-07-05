<template>
    <UCard class="hover:shadow-md transition-shadow bg-default border-default">
        <div class="flex flex-col lg:flex-row lg:items-center gap-4">
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                    <!-- Icon -->
                    <UIcon :name="statusIcon" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <!-- Title -->
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                        {{ document.title }}
                        <UIcon
                            v-if="document.status === 'Approved'"
                            name="i-lucide-lock"
                            class="w-4 h-4 text-green-500 ml-1"
                        />
                    </h3>
                    <!-- Status -->
                    <div
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        :class="statusColors[document.status]?.badge || 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'"
                    >
                        {{ document.status }}
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Entity</p>
                        <p class="font-medium dark:text-gray-100">{{ document.entity }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Author</p>
                        <p class="font-medium dark:text-gray-100">{{ document.author }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Version</p>
                        <p class="font-medium dark:text-gray-100">{{ document.version }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Last Modified</p>
                        <p class="font-medium dark:text-gray-100">{{ document.lastModified }}</p>
                    </div>
                </div>
                <div class="mt-3">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                        <span class="text-sm font-medium dark:text-gray-100">{{ document.progress }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                            class="h-2 rounded-full"
                            :class="statusColors[document.status]?.progress || 'bg-blue-500 dark:bg-blue-400'"
                            :style="{ width: document.progress + '%' }"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <UButton label="View" icon="i-lucide-eye" variant="outline" color="neutral" />
                    <UButton
                        label="Edit"
                        icon="i-lucide-square-pen"
                        variant="outline"
                        color="neutral"
                        :disabled="document.status === 'Approved'"
                    />
                    <UButton label="Export" icon="i-lucide-download" variant="outline" color="neutral" />
                </div>
                <UButton
                    :label="`${document.comments} Comments`"
                    icon="i-lucide-message-square"
                    variant="outline"
                    color="secondary"
                    class="w-full justify-center"
                />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
type StatusType = 'Approved' | 'Under Review' | 'Draft' | 'Rejected'

const props = defineProps<{
    document: {
        title: string
        status: StatusType
        entity: string
        author: string
        version: string
        lastModified: string
        progress: number
        comments: number
    }
}>()

const statusColors: Record<StatusType, { badge: string; progress: string; icon: string }> = {
    'Approved': {
        badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        progress: 'bg-green-500 dark:bg-green-400',
        icon: 'i-lucide-check-circle'
    },
    'Under Review': {
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        progress: 'bg-blue-500 dark:bg-blue-400',
        icon: 'i-lucide-clock'
    },
    'Draft': {
        badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        progress: 'bg-yellow-500 dark:bg-yellow-400',
        icon: 'i-lucide-pen'
    },
    'Rejected': {
        badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        progress: 'bg-red-500 dark:bg-red-400',
        icon: 'i-lucide-x-circle'
    }
}

const statusIcon = statusColors[props.document.status]?.icon || 'i-lucide-file-text'
</script>