<template>
    <UModal v-model:open="open" title="Create Section" description="Add a new section to your ISSP document template." :ui="uiModalConfig"
        :dismissible="false">
        <UButton label="Create Section" icon="i-lucide-plus" color="neutral" size="lg" />
        <template #body>
            <div class="space-y-4">
                <UInput placeholder="Section Title" size="lg" class="w-full" />
                <UTextarea :rows="4" placeholder="Section description or purpose..." size="lg" class="w-full" />
                <USelect v-model="sectionType" :items="types" value-key="value" :icon="icon" size="lg" class="w-full" />

                <!-- Richtext Editor -->
                <TipTapEditor v-if="sectionType === 'text_content'" />

                <!-- Image Upload -->
                <ImgUpload v-if="sectionType === 'image_upload'" label="Upload image" v-model:fileList="galleryImages"
                    :multiple="true" :maxFiles="5" :maxSizeMB="3" />

                <!-- DB Options -->
                <USelect v-if="sectionType === 'db_mapping'" :items="database" placeholder="Select DB" size="lg"
                    class="w-full" />
                <!-- API Options -->
                <USelect v-if="sectionType === 'api_mapping'" :items="api" placeholder="Select API" size="lg"
                    class="w-full" />
                <!-- AI Prompt -->
                <UTextarea v-if="sectionType === 'ai_prompt'" :rows="4" placeholder="AI prompts..." size="lg"
                    class="w-full" />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <UButton color="neutral" label="Cancel" size="lg" variant="outline" class="w-full justify-center" @click="open = false" />
                    <UButton label="Add Section" icon="i-lucide-plus" color="primary" size="lg"
                        class="w-full justify-center" />
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SelectItem } from '@nuxt/ui'
const types = ref([
    { label: 'Text Content', value: 'text_content', icon: 'i-lucide-file-text' },
    { label: 'Image Upload', value: 'image_upload', icon: 'i-lucide-image' },
    { label: 'DB Mapping', value: 'db_mapping', icon: 'i-lucide-database' },
    { label: 'API Mapping', value: 'api_mapping', icon: 'i-lucide-settings' },
    { label: 'AI Prompt', value: 'ai_prompt', icon: 'i-lucide-bot' }
] satisfies SelectItem[])
const sectionType = ref(types.value[0]?.value)
const icon = computed(() => types.value.find(item => item.value === sectionType.value)?.icon)

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

const galleryImages = ref<File[]>([])

// Modal UI config
const uiModalConfig = {
    content: 'divide-y-0 max-w-2xl',
    header: 'sm:p-6 space-y-1.5 items-center',
    body: 'pt-0 sm:pt-0',
    title: 'text-xl font-semibold leading-none',
}

const open = ref(false)
</script>