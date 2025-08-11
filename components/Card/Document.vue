<template>
    <UCard class="hover:shadow-md transition-shadow bg-default border-default">
        <div class="flex flex-col lg:flex-row lg:items-center gap-4">
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                    <!-- Icon -->
                    <UIcon :name="statusIcon" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <!-- Title -->
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                        {{ title }}
                        <UIcon v-if="status === 'Approved'" name="i-lucide-lock" class="w-4 h-4 text-green-500 ml-1" />
                    </h3>
                    <!-- Status -->
                    <UBadge :label="status" :color="statusColor" variant="soft" class="rounded-full" />
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Entity</p>
                        <p class="font-medium dark:text-gray-100">{{ entity }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Author</p>
                        <p class="font-medium dark:text-gray-100">{{ author }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Version</p>
                        <p class="font-medium dark:text-gray-100">{{ version }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 dark:text-gray-400">Last Modified</p>
                        <p class="font-medium dark:text-gray-100">{{ lastModified }}</p>
                    </div>
                </div>

                <div class="mt-3">
                    <BaseProgress label="Progress" :value="progress" :color="progressColor"
                        :justifyStart="justifyStart" />
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <UButton label="View" icon="i-lucide-eye" variant="outline" color="neutral" size="lg"
                        @click="handleViewClick" />
                    <UButton label="Edit" icon="i-lucide-square-pen" variant="outline" color="neutral" size="lg"
                        @click="emit('edit')" :disabled="status === 'Approved'" />
                    <UButton label="Export" icon="i-lucide-download" variant="outline" color="neutral" size="lg"
                        @click="emit('export')" />
                </div>
                <UButton :label="`${comments} Comments`" icon="i-lucide-message-square" variant="outline"
                    color="secondary" class="w-full justify-center" />
            </div>
        </div>
    </UCard>
    <!-- Modal -->
    <UModal v-model:open="isModalOpen" fullscreen>
        <template #content="{ close }">
            <TipTapEditor :show-details="showDetails" @close="close" />
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const isModalOpen = ref(false)
const showDetails = ref(false)

function handleViewClick() {
  showDetails.value = true // show details when modal opens
  isModalOpen.value = true
}

type StatusType = 'Approved' | 'Under Review' | 'Draft' | 'Rejected'

interface Props {
    title: string
    status: StatusType
    entity: string
    author: string
    version: string
    lastModified: string
    progress: number
    comments: number
    justifyStart: boolean
}

const props = defineProps<Props>()

// Destructure props to avoid prefixing with props.*
const {
    title,
    status,
    entity,
    author,
    version,
    lastModified,
    progress,
    comments,
    justifyStart
} = props

const statusMeta = {
    Approved: {
        icon: 'i-lucide-check-circle',
        badgeColor: 'success'
    },
    'Under Review': {
        icon: 'i-lucide-clock',
        badgeColor: 'secondary'
    },
    Draft: {
        icon: 'i-lucide-pen',
        badgeColor: 'warning'
    },
    Rejected: {
        icon: 'i-lucide-x-circle',
        badgeColor: 'error'
    }
} as const satisfies Record<StatusType, { icon: string; badgeColor: 'success' | 'secondary' | 'warning' | 'error' }>

const statusIcon = computed(() => statusMeta[status]?.icon || 'i-lucide-file-text')
const statusColor = computed(() => statusMeta[status]?.badgeColor || 'neutral')
const progressColor = computed(() => statusColor.value)

const emit = defineEmits<{
    (e: 'view'): void
    (e: 'edit'): void
    (e: 'export'): void
}>()
</script>