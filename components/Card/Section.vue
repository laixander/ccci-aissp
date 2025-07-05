<template>
    <div class="flex items-center bg-white dark:bg-gray-700/50 rounded p-4 relative shadow-sm">
        <!-- Card Ink -->
        <div class="absolute left-0 top-0 h-full w-2 rounded-l" :class="typeColors.ink"></div>

        <!-- Card Info -->
        <div class="flex-1 flex justify-between items-center pl-2">
            <div class="flex items-center gap-3 w-full">
                <!-- Icon Type -->
                <UIcon :name="typeIcon" class="w-6 h-6" :class="iconColor" />
                <div>
                    <!-- Title -->
                    <h4 class="font-semibold" :class="titleColor">
                        {{ title }}
                    </h4>
                    <!-- Description -->
                    <p class="text-sm" :class="descriptionColor">
                        {{ description }}
                    </p>
                </div>
            </div>

            <!-- Badge Type -->
            <div class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-nowrap"
                :class="typeColors.badge">
                {{ typeLabel }}
            </div>
        </div>

        <!-- Card Actions -->
        <div class="flex items-center space-x-2 ml-4">
            <UButton icon="i-lucide-edit" color="neutral" variant="ghost" size="sm" aria-label="Edit"
                @click="$emit('edit')" />
            <UButton icon="i-lucide-trash" color="error" variant="ghost" size="sm" aria-label="Delete"
                @click="$emit('delete')" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
        type: String,
        required: true,
        validator: (value) => [
            'text_content',
            'image_upload',
            'db_mapping',
            'api_mapping',
            'ai_prompt'
        ].includes(value)
    },
    iconColor: { type: String, default: 'text-gray-400 dark:text-gray-300' },
    titleColor: { type: String, default: 'text-gray-800 dark:text-gray-100' },
    descriptionColor: { type: String, default: 'text-gray-500 dark:text-gray-400' }
})

const typeMap = {
    text_content: { label: 'Text Content', icon: 'i-lucide-file-text', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100', ink: 'bg-blue-600' },
    image_upload: { label: 'Image Upload', icon: 'i-lucide-image', badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100', ink: 'bg-green-600' },
    db_mapping: { label: 'DB Mapping', icon: 'i-lucide-database', badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100', ink: 'bg-yellow-500' },
    api_mapping: { label: 'API Mapping', icon: 'i-lucide-settings', badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100', ink: 'bg-purple-600' },
    ai_prompt: { label: 'AI Prompt', icon: 'i-lucide-bot', badge: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100', ink: 'bg-primary-600' }
}

const typeConfig = computed(() => typeMap[props.type])
const typeLabel = computed(() => typeConfig.value.label)
const typeIcon = computed(() => typeConfig.value.icon)
const typeColors = computed(() => ({
    badge: typeConfig.value.badge,
    ink: typeConfig.value.ink
}))
</script>
