<template>
    <Block title="Document Sections"
        description="Define and organize the sections that will appear in your ISSP document template.">
        <template #actions>
            <!-- Modal: Create Sections -->
            <SectionSettings v-if="selectedSection !== null" v-model:section="selectedSection" @update="onUpdateSection" @reset="selectedSection = null" />
            <SectionSettings v-else @add="onAddSection" @reset="selectedSection = null" />
        </template>
        <template #content>
            <div class="space-y-4 bg-gray-50 dark:bg-gray-800/25 rounded-md p-4">
                <!-- Hide this when Sections exist -->
                <!-- <div v-if="!sections || sections.length === 0"
                    class="text-center py-8 text-gray-500 dark:text-gray-400">
                    <UIcon name="i-lucide-file-text" class="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
                    <p class="text-sm">No sections added yet. Click "Create Section" to get started.</p>
                </div> -->
                <EmptyState :show="sections.length === 0"
                    icon="i-lucide-inbox"
                    description="No sections added yet. Click 'Create Section' to get started."
                />
                <!-- Created Sections -->
                <draggable v-model="sections" item-key="id" class="space-y-4" :animation="200" ghost-class="drag-ghost"
                    chosen-class="drag-chosen">
                    <template #item="{ element: section }">
                        <CardSection :title="section.title" :description="section.description" :type="section.type" @edit="onEdit(section)" @delete="onDelete(section)" />
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

const selectedSection = ref<Section | null>(null)

function onEdit(section: Section) {
    selectedSection.value = { ...section }
}

function onUpdateSection(updated: Section) {
    const index = sections.value.findIndex(s => s.id === updated.id)
    if (index !== -1) sections.value[index] = updated
    selectedSection.value = null
}

function onDelete(section: Section) {
    sections.value = sections.value.filter(s => s.id !== section.id)
}

function onAddSection(section: Omit<Section, 'id'>) {
    const nextId = Math.max(0, ...sections.value.map(s => s.id)) + 1
    sections.value.push({ ...section, id: nextId })
    selectedSection.value = null
}

// Sample data
const sections = ref<Section[]>([
    {
        id: 1,
        title: 'Table of Contents',
        description: 'Define the structure and content of the document.',
        type: 'text_content'
    },
    {
        id: 2,
        title: 'MSU Marawi Campus - Organisational Chart',
        description: 'Upload the organizational chart image for MSU Marawi Campus.',
        type: 'image_upload'
    },
    {
        id: 3,
        title: 'Strategic Concerns for ICT Use',
        description: 'Mapping database fields for strategic concerns.',
        type: 'db_mapping'
    },
    {
        id: 4,
        title: 'Strategic Concerns for ICT Use',
        description: 'Map API endpoints for strategic concerns.',
        type: 'api_mapping'
    },
    {
        id: 5,
        title: 'Functional Description',
        description: 'Generated functional description for org chart using AI prompts.',
        type: 'ai_prompt'
    },
    {
        id: 6,
        title: 'Internal Mapping',
        description: 'Configure internal data relationships and linkages.',
        type: 'internal_mapping'
    }
])
</script>

<style scoped>
/* .drag-chosen {
    @apply scale-101 z-10 transition-transform duration-200;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
} */

.drag-ghost {
    @apply opacity-0;
}
</style>
