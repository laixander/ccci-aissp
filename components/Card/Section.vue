<template>
    <div class="flex items-center bg-white dark:bg-gray-700/50 rounded p-4 relative shadow-sm">
        <!-- Card Ink -->
        <div class="absolute left-0 top-0 h-full w-2 rounded-l" :class="typeColors.ink"></div>

        <!-- Card Info -->
        <div class="relative grid xl:flex items-center gap-3 w-full pl-2">
            <!-- Icon Type -->
            <UIcon :name="typeIcon" class="w-6 h-6 shrink-0 text-gray-800 dark:text-gray-100" />
            <div class="flex-1 truncate">
                <!-- Title -->
                <h4 class="font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {{ title }}
                </h4>
                <!-- Description -->
                <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {{ description }}
                </p>
            </div>
            <!-- Badge Type -->
            <div>
                <div class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-nowrap"
                    :class="typeColors.badge">
                    {{ typeLabel }}
                </div>
            </div>
            <!-- Card Actions -->
            <div class="absolute top-0 right-0 xl:relative flex items-center space-x-2 ml-4">
                <!-- Preview Modal -->
                <UModal :ui="uiModalConfig">
                    <UTooltip text="Preview Section">
                        <UButton icon="i-lucide-gallery-horizontal-end" color="neutral" variant="ghost" size="sm"
                            aria-label="Preview" @click="$emit('preview')" />
                    </UTooltip>
                    <template #header="{ close }">
                        <div class="flex items-center space-x-2 w-full">
                            <UIcon :name="typeIcon" class="w-6 h-6 text-gray-800 dark:text-gray-100" />
                            <h4 class="font-semibold text-gray-800 dark:text-gray-100 mr-auto">
                                {{ title }}
                            </h4>
                            <UButton label="Close" color="neutral" variant="outline" @click="close" />
                        </div>
                    </template>
                    <template #body>
                        <div class="p-6 space-y-4 bg-gray-400 dark:bg-gray-950 overflow-y-auto">
                            <UCard class="shadow-xl">
                                <PreviewText v-if="props.type === 'text_content'" />
                                <PreviewImage v-if="props.type === 'image_upload'" />
                                <PreviewDb v-if="props.type === 'db_mapping' || props.type === 'api_mapping'" />
                                <PreviewAi v-if="props.type === 'ai_prompt'" />
                            </UCard>
                        </div>
                    </template>
                </UModal>
                <!-- Edit -->
                <UTooltip text="Edit Section">
                    <UButton icon="i-lucide-edit" color="neutral" variant="ghost" size="sm" aria-label="Edit"
                        @click="$emit('edit', { title, description, type })" />
                </UTooltip>
                <!-- Delete Confirmation Modal -->
                <Confirmation @delete="$emit('delete')">
                    <template #action>
                        <UTooltip text="Delete Section">
                            <UButton icon="i-lucide-trash" color="error" variant="ghost" size="sm" aria-label="Delete" />
                        </UTooltip>
                    </template>
                    <template #message>
                        <p class="text-gray-800 dark:text-gray-100 font-medium">
                            Are you sure you want to delete this <span class="font-extrabold" :class="typeColors.badge">{{
                                title }}</span> section?
                        </p>
                    </template>
                </Confirmation>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    title: string
    description: string
    type: 'text_content' | 'image_upload' | 'db_mapping' | 'api_mapping' | 'ai_prompt' | 'internal_mapping'
}

const props = defineProps<Props>()

const typeMap = {
    text_content: { label: 'Text Content', icon: 'i-lucide-type', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100', ink: 'bg-blue-600' },
    image_upload: { label: 'Image Upload', icon: 'i-lucide-image', badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100', ink: 'bg-green-600' },
    db_mapping: { label: 'DB Mapping', icon: 'i-lucide-table', badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100', ink: 'bg-yellow-500' },
    api_mapping: { label: 'API Mapping', icon: 'i-lucide-file-cog', badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100', ink: 'bg-purple-600' },
    ai_prompt: { label: 'AI Prompt', icon: 'i-lucide-sparkles', badge: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100', ink: 'bg-primary-600' },
    internal_mapping: { label: 'Internal Mapping', icon: 'i-lucide-network', badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100', ink: 'bg-orange-500' }
}

const typeConfig = computed(() => typeMap[props.type])
const typeLabel = computed(() => typeConfig.value.label)
const typeIcon = computed(() => typeConfig.value.icon)
const typeColors = computed(() => ({
    badge: typeConfig.value.badge,
    ink: typeConfig.value.ink
}))

const uiModalConfig = {
    content: 'divide-y-0 max-w-6xl',
    body: 'p-0 sm:p-0',
    title: 'font-semibold',
}

// Sample Data
</script>
