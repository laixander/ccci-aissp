<template>
    <UCard :ui="ui" class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="space-y-4">
                    <!-- Logo Preview -->
                    <div v-if="template.logo">
                        <img :src="template.logo" alt="Logo"
                            class="h-16 w-auto" />
                    </div>
                    <!-- Color Chips -->
                    <div class="flex justify-center gap-2" v-if="template.primaryColor || template.secondaryColor">
                        <div v-if="template.primaryColor" class="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-700"
                            :style="{ backgroundColor: template.primaryColor }" title="Primary Color"></div>
                        <div v-if="template.secondaryColor" class="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-700"
                            :style="{ backgroundColor: template.secondaryColor }" title="Secondary Color"></div>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-900 dark:text-gray-100">{{ template.name }}</h4>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">{{ template.description }}</p>
                    <!-- Header/Footer Preview -->
                    <div v-if="template.header" class="text-xs text-gray-400 dark:text-gray-500 italic mt-1">
                        <span class="font-semibold">Header:</span> {{ template.header }}
                    </div>
                    <div v-if="template.footer" class="text-xs text-gray-400 dark:text-gray-500 italic">
                        <span class="font-semibold">Footer:</span> {{ template.footer }}
                    </div>
                    <div v-if="template.sections?.length" class="mt-2 flex flex-wrap gap-2">
                        <!-- Badge -->
                        <div v-for="(section, sidx) in template.sections" :key="section.title + sidx"
                            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                            :class="typeColors[section.type]?.badge || 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'">
                            {{ section.title }}
                        </div>
                    </div>
                </div>
            </div>
            <UButton icon="i-lucide-edit" color="primary" variant="ghost" size="sm" aria-label="Edit"
                @click="emit('edit', template)" />
        </div>
    </UCard>
</template>

<script setup lang="ts">
const emit = defineEmits(['edit'])

const typeColors = {
    text_content: {
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
        ink: 'bg-blue-600'
    },
    image_upload: {
        badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        ink: 'bg-green-600'
    },
    data_table: {
        badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
        ink: 'bg-yellow-500'
    },
    custom_component: {
        badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
        ink: 'bg-purple-600'
    }
}

defineProps<{
    template: {
        name: string
        description: string
        sections: Array<any>
        logo?: string | null
        primaryColor?: string
        secondaryColor?: string
        header?: string
        footer?: string
    }
    ui?: any
}>()
</script>