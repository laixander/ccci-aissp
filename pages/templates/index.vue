<template>
    <Page page-title="Document Templates" page-description="Manage and configure layout templates for ISSP documents">
        <template #actions>
            <UButton label="New Template" icon="i-lucide-plus" size="lg" class="w-full lg:w-auto justify-center"
                to="/templates/create" />
        </template>
        <template #content>
            <div class="space-y-4">
                <UInput icon="i-lucide-search" size="lg" variant="outline" placeholder="Search templates..."
                    :ui="uiSearchConfig" />

                <!-- <div v-if="templates.length === 0" class="text-center text-muted text-sm py-12">
                    <UIcon name="i-lucide-file-plus" class="w-8 h-8 mx-auto mb-2 text-muted" />
                    <p>No templates found.</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Click “New Template” to create your first one.</p>
                </div> -->

                <EmptyState :show="templates.length === 0"
                    icon="i-lucide-inbox"
                    title="No templates found."
                    description="Click “New Template” to create your first one."
                />

                <CardTemplateList v-for="(template, index) in templates" :key="template.title" v-bind="template"
                    @edit="() => handleEdit(index)" @copy="() => handleCopy(index)"
                    @delete="() => handleDelete(index)" />
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

const uiSearchConfig = {
    root: 'w-full',
}

const templates = ref([
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
])

function handleEdit(index: number) {
    console.log(`Edit clicked on card ${index}`)
}

function handleCopy(index: number) {
  const original = templates.value[index]
  const duplicate = {
    ...original,
    title: `${original.title} (Copy)`,
    created: new Date().toLocaleDateString(),
    updated: new Date().toLocaleDateString(),
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
    const template = templates.value[index];
    if (template) {
        templates.value.splice(index, 1)
    }
}
</script>