<template>
    <Page page-title="Document Templates" page-description="Manage and configure layout templates for ISSP documents">
        <template #actions>
            <UButton label="New Template" icon="i-lucide-plus" size="lg" class="w-full lg:w-auto justify-center" />
        </template>
        <template #content>
            <UTabs color="neutral" :items="items" class="gap-4 w-full" :ui="{ trigger: 'grow' }">
                <template #list>
                    <div class="space-y-4">
                        <UInput icon="i-lucide-search" size="lg" variant="outline" placeholder="Search templates..." :ui="uiSearchConfig" />
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
                <template #create>
                    Create Content
                </template>
                <template #edit>
                    Edit Content
                </template>
            </UTabs>
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
})
import type { TabsItem } from '@nuxt/ui'

const items = ref<TabsItem[]>([
    {
        label: 'Template List',
        slot: 'list' as const
    },
    {
        label: 'Create Template',
        slot: 'create' as const
    },
    {
        label: 'Edit Template',
        slot: 'edit' as const,
        disabled: true
    }
])

const uiSearchConfig = {
    root: 'w-full',
}

const templates = [
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

function handleEdit(index: number) {
  console.log(`Edit clicked on card ${index}`)
}

function handleCopy(index: number) {
  console.log(`Copy clicked on card ${index}`)
}

function handleDelete(index: number) {
  console.log(`Delete clicked on card ${index}`)
}
</script>