<template>
    <Page page-title="Document Templates" page-description="Manage and configure layout templates for ISSP documents">
        <template #actions>
            <UButton 
                label="New Template" 
                icon="i-lucide-plus" 
                size="lg" 
                class="w-full lg:w-auto justify-center"
                @click="openCreateModal" 
            />
            <FormNewTemplate 
                v-model:open="isFormOpen" 
                :template="formModalData" 
                @create="handleCreateTemplate" 
            />
        </template>

        <template #content>
            <div class="space-y-4">
                <UInput icon="i-lucide-search" size="lg" variant="outline" placeholder="Search templates..."
                    :ui="uiSearchConfig" />

                <EmptyState 
                    :show="templates.length === 0" 
                    icon="i-lucide-inbox" 
                    title="No templates found."
                    description="Click “New Template” to create your first one." 
                />

                <CardTemplateList 
                    v-for="(template, index) in templates" 
                    :key="template.title" 
                    v-bind="template"
                    @edit="() => handleEdit(index)" 
                    @copy="() => handleCopy(index)"
                    @delete="() => handleDelete(index)" 
                />
            </div>
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    auth: false
})

const toast = useToast()

const isFormOpen = ref(false)
const formModalData = ref<TemplateItem | null>(null)
const currentEditIndex = ref<number | null>(null)

const templates = ref<TemplateItem[]>([])

function openCreateModal() {
    currentEditIndex.value = null
    formModalData.value = null
    isFormOpen.value = true
}

function handleEdit(index: number) {
    currentEditIndex.value = index
    formModalData.value = { ...templates.value[index] }
    isFormOpen.value = true
}

function handleCopy(index: number) {
    const original = templates.value[index]
    const duplicate = {
        ...original,
        title: `${original.title} (Copy)`,
        created: new Date().toLocaleDateString(),
        updated: new Date().toLocaleDateString()
    }
    templates.value.splice(index + 1, 0, duplicate)

    toast.add({
        title: 'Template duplicated',
        description: `"${original.title}" was successfully copied.`,
        icon: 'i-lucide-copy',
        color: 'primary'
    })
}

function handleDelete(index: number) {
    templates.value.splice(index, 1)
}

function handleCreateTemplate(newTemplate: TemplateItem) {
    if (currentEditIndex.value !== null) {
        templates.value[currentEditIndex.value] = newTemplate
        toast.add({
            title: 'Template updated',
            description: `"${newTemplate.title}" was successfully updated.`,
            icon: 'i-lucide-check',
            color: 'primary'
        })
    } else {
        templates.value.unshift(newTemplate)
        toast.add({
            title: 'Template created',
            description: `"${newTemplate.title}" was successfully added.`,
            icon: 'i-lucide-check',
            color: 'primary'
        })
    }
    currentEditIndex.value = null
}

const uiSearchConfig = { root: 'w-full' }

// Sample data for demo/testing
templates.value = [
    {
        title: 'Standard ISSP Template',
        description: 'Default template for Information System Security Plans',
        status: 'Active',
        sections: ['Executive Summary', 'System Overview', 'Risk Assessment'],
        user: 'Admin User',
        created: '1/15/2024',
        updated: '1/20/2024'
    },
    {
        title: 'Cloud Migration Template',
        description: 'Template for planning cloud transition strategies',
        status: 'Inactive',
        sections: ['Introduction', 'Infrastructure Mapping', 'Risk Mitigation'],
        user: 'Jane Smith',
        created: '3/02/2024',
        updated: '3/18/2024'
    },
    {
        title: 'Incident Response Plan',
        description: 'Pre-built guide for security incident responses',
        status: 'Active',
        sections: ['Summary', 'Team Roles'],
        user: 'CyberSec Lead',
        created: '5/01/2024',
        updated: '5/10/2024'
    }
]
</script>