<template>
    <UModal v-model:open="open" :title="isEditMode ? 'Edit Section' : 'Create Section'"
        description="Add a new section to your ISSP document template." :ui="uiModalConfig" :dismissible="false">
        <UButton label="Create Section" icon="i-lucide-plus" color="neutral" size="lg" block @click="$emit('reset')" />
        <template #body>
            <div class="space-y-4">
                <UInput v-model="title" placeholder="Section Title" size="lg" class="w-full" />
                <UTextarea v-model="description" :rows="4" placeholder="Section description or purpose..." size="lg"
                    class="w-full" />
                <UAlert orientation="horizontal" color="neutral" variant="soft" class="text-sm">
                    <template #description>
                        <div class="flex items-center gap-2">
                            <UCheckbox default-value /> 
                            <span class="text-gray-600 dark:text-gray-300">
                                Opt out title and description on document generation.
                            </span>
                        </div>
                    </template>
                </UAlert>

                <USelect v-model="sectionType" :items="types" value-key="value" :icon="icon" size="lg" class="w-full" />

                <!-- Richtext Editor -->
                <TipTapEditor v-if="sectionType === 'text_content'" />

                <!-- Image Upload -->
                 <div v-if="sectionType === 'image_upload'">
                    <ImgUpload label="Upload image" v-model:fileList="galleryImages"
                    :multiple="false" :maxSizeMB="2" />
                 </div>

                <!-- DB Options -->
                <USelect v-if="sectionType === 'db_mapping'" :items="database" placeholder="Select DB" size="lg" class="w-full" />

                <!-- API Options -->
                <USelect v-if="sectionType === 'api_mapping'" :items="api" placeholder="Select API" size="lg" class="w-full" />

                <!-- AI Prompt -->
                <UTextarea v-if="sectionType === 'ai_prompt'" :rows="4" placeholder="AI prompts..." size="lg" class="w-full" />

                <!-- Internal Options -->
                <USelect v-if="sectionType === 'internal_mapping'" :items="planning" placeholder="Select Planning" size="lg" class="w-full" />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <UButton label="Cancel" variant="outline" color="neutral" size="lg" class="w-full justify-center"
                        @click="open = false" />
                    <UButton :label="isEditMode ? 'Update Section' : 'Add Section'" :icon="isEditMode ? 'i-lucide-pencil-line' : 'i-lucide-plus'" color="primary"
                        size="lg" class="w-full justify-center" @click="addSection" />
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, type PropType } from 'vue'
import type { RadioGroupItem, SelectItem } from '@nuxt/ui'
const types = ref([
    { label: 'Text Content', value: 'text_content', icon: 'i-lucide-type' },
    { label: 'Image Upload', value: 'image_upload', icon: 'i-lucide-image' },
    { label: 'DB Mapping', value: 'db_mapping', icon: 'i-lucide-table' },
    { label: 'API Mapping', value: 'api_mapping', icon: 'i-lucide-file-cog' },
    { label: 'AI Prompt', value: 'ai_prompt', icon: 'i-lucide-sparkles' },
    { label: 'Internal Mapping', value: 'internal_mapping', icon: 'i-lucide-network' }
] satisfies SelectItem[])

const props = defineProps({
    section: {
        type: Object as PropType<Partial<Section> | null>,
        default: null
    }
})

const sectionType = ref(types.value[0]?.value)
const title = ref('')
const description = ref('')
const icon = computed(() => types.value.find(item => item.value === sectionType.value)?.icon)
const isEditMode = computed(() => !!props.section?.id)

const database = [
    { label: 'Student DB', value: 'student_db' },
    { label: 'Faculty DB', value: 'faculty_db' },
    { label: 'Finance DB', value: 'finance_db' }
]

const api = [
    { label: 'Student API', value: 'student_api' },
    { label: 'HR API', value: 'hr_api' },
    { label: 'Library API', value: 'library_api' }
]

const planning = [
    { label: 'Planning 1', value: 'plan_1' },
    { label: 'Planning 2', value: 'plan_2' },
    { label: 'Planning 3', value: 'plan_3' }
]

const galleryImages = ref<File[]>([])

// Modal UI config
const uiModalConfig = {
    content: 'divide-y-0 max-w-2xl',
    header: 'sm:p-6 space-y-1.5 items-center',
    body: 'pt-0 sm:pt-0',
    title: 'text-xl font-semibold leading-none',
}

const open = ref(false)

const emit = defineEmits(['add', 'update'])

watch(() => props.section, (val) => {
    if (val) {
        title.value = val.title || ''
        description.value = val.description || ''
        sectionType.value = val.type || types.value[0]?.value
        open.value = true
    }
}, { immediate: true })

function addSection() {
    const newSection = {
        title: title.value,
        description: description.value,
        type: sectionType.value,
        icon: icon.value,
    }
    if (props.section?.id) {
        emit('update', { ...props.section, ...newSection })
    } else {
        emit('add', newSection)
    }
    open.value = false
    // Reset form
    title.value = ''
    description.value = ''
    sectionType.value = types.value[0]?.value
    galleryImages.value = []
}

const layouts = ref<RadioGroupItem[]>(
    [
        { label: 'Grid', value: 'grid', icon: 'i-lucide-layout-grid' },
        { label: 'Horizontal', value: 'horizontal', icon: 'i-lucide-stretch-horizontal' },
        { label: 'Vertical', value: 'vertical', icon: 'i-lucide-stretch-vertical' }
    ]
)
</script>