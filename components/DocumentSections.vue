<template>
    <Block title="Document Sections"
        description="Define and organize the sections that will appear in your ISSP document template." class="w-full">
        <template #actions>
            <!-- Modal: Create Sections -->
            <SectionSettings />
        </template>
        <template #content>
            <div class="space-y-4 bg-gray-50 dark:bg-gray-800/25 rounded-md p-4">
                <!-- Hide this when Sections exist -->
                <div v-if="!sections || sections.length === 0"
                    class="text-center py-8 text-gray-500 dark:text-gray-400">
                    <UIcon name="i-lucide-file-text" class="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
                    <p class="text-sm">No sections added yet. Click "Create Section" to get started.</p>
                </div>
                <!-- Created Sections -->
                <draggable v-model="sections" item-key="id" class="space-y-4" :animation="200" ghost-class="drag-ghost"
                    chosen-class="drag-chosen">
                    <template #item="{ element: section }">
                        <CardSection :title="section.title" :description="section.description" :type="section.type"
                            @edit="onEdit(section)" @delete="onDelete(section)" />
                    </template>
                </draggable>
            </div>
        </template>
    </Block>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

type Section = {
    id: number
    title: string
    description: string
    type: string
}

const sections = ref<Section[]>([
    {
        id: 1,
        title: 'About Us Section',
        description: 'This section contain text header and description.',
        type: 'text_content'
    },
    {
        id: 2,
        title: 'Gallery Upload',
        description: 'Users can upload images to this section.',
        type: 'image_upload'
    },
    {
        id: 3,
        title: 'Product Mapping',
        description: 'Mapping database fields to UI components.',
        type: 'db_mapping'
    },
    {
        id: 4,
        title: 'API Configuration',
        description: 'Set up endpoints and response mappings.',
        type: 'api_mapping'
    },
    {
        id: 5,
        title: 'Smart Assistant',
        description: 'Prompt settings for AI generation.',
        type: 'ai_prompt'
    }
])

function onEdit(section: any) {
    console.log('Edit:', section)
}

function onDelete(section: any) {
    console.log('Delete:', section)
}
</script>

<style scoped>
.drag-chosen {
    @apply scale-105 z-10 transition-transform duration-200;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.drag-ghost {
    @apply opacity-100;
}
</style>
