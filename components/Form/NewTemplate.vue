<template>
    <UModal 
        title="New Templates" 
        description="Create and save reusable templates to simplify repeated tasks."
        :ui="uiModalConfig" 
        :open="props.open" 
        @update:open="(value) => emit('update:open', value)"
    >
        <template #close>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="() => emit('update:open', false)" />
        </template>

        <template #body>
            <div class="space-y-4">
                <UFormField label="Template Name" size="lg" required>
                    <UInput v-model="templateName" placeholder="e.g., Standard ISSP Template" class="w-full" />
                </UFormField>

                <UFormField label="Description" size="lg">
                    <UTextarea v-model="templateDescription" :rows="3"
                        placeholder="Brief description of the strategic plan scope and objectives..." class="w-full" />
                </UFormField>

                <UFormField label="University Logo">
                    <ImgUpload label="Upload logo" v-model:fileList="logoImage" :multiple="false" :maxSizeMB="2" />
                </UFormField>

                <UFormField label="Document Header" size="lg">
                    <UTextarea :rows="3" placeholder="Enter custom header text for ISSP documents..." class="w-full" />
                </UFormField>

                <UFormField label="Document Footer" size="lg">
                    <UTextarea :rows="3" placeholder="Enter custom footer text for ISSP documents..." class="w-full" />
                </UFormField>

                <UAlert orientation="horizontal" color="neutral" variant="soft" class="text-sm">
                    <template #description>
                        <div class="flex items-center gap-2">
                            <USwitch v-model="isActive" />
                            <span class="text-gray-600 dark:text-gray-300">
                                Set this template as active.
                            </span>
                        </div>
                    </template>
                </UAlert>
            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 w-full justify-end">
                <UButton 
                    label="Cancel" 
                    color="neutral" 
                    size="lg" 
                    variant="outline" 
                    @click="() => {
                        emit('update:open', false)
                        resetForm()
                    }" 
                />
                <UButton 
                    label="Create Template" 
                    size="lg" 
                    :disabled="!templateName" 
                    @click="handleCreate" 
                />
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    open: boolean
    template?: TemplateItem | null
}>()

const emit = defineEmits(['update:open', 'create'])

const templateName = ref('')
const templateDescription = ref('')
const isEditMode = ref(false)
const isActive = ref(true)
const logoImage = ref([])

function handleCreate() {
    const newTemplate: TemplateItem = {
        title: templateName.value,
        description: templateDescription.value,
        status: isActive.value ? 'Active' : 'Inactive',
        sections: props.template?.sections || [],
        user: 'Current User',
        created: new Date().toLocaleDateString(),
        updated: new Date().toLocaleDateString()
    }

    emit('create', newTemplate)
    emit('update:open', false)
    resetForm()
}

function resetForm() {
    templateName.value = ''
    templateDescription.value = ''
    isActive.value = true
    logoImage.value = []
}

watch(
    () => props.template,
    (template) => {
        if (template) {
            isEditMode.value = true
            templateName.value = template.title
            templateDescription.value = template.description
            isActive.value = template.status === 'Active'
        } else {
            isEditMode.value = false
            resetForm()
        }
    },
    { immediate: true }
)

type TemplateItem = {
    title: string
    description: string
    status: string
    sections: string[]
    user: string
    created: string
    updated: string
}

const uiModalConfig = {
    content: 'divide-y-0 max-w-2xl',
    header: 'sm:py-6 justify-between items-start',
    body: 'pt-0 sm:pt-0',
    title: 'text-2xl font-semibold leading-none'
}
</script>