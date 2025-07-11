<template>
    <Page
        page-title="ISSP Document Management"
        page-description="Create, review, and manage Information Systems Strategic Plans">
        <template #actions>
            <UButton label="Bulk Report" icon="i-lucide-download" size="lg" color="neutral" variant="outline" class="w-full lg:w-auto justify-center" />
            <UButton label="New ISSP Document" icon="i-lucide-file-text" size="lg" class="w-full lg:w-auto justify-center" to="/document/new" />
        </template>
        <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardStat v-for="stat in cardStats" :key="stat.label" v-bind="stat" />
            </div>
            <UCard>
                <div class="flex flex-col sm:flex-row gap-4">
                    <UInput icon="i-lucide-search" size="lg" variant="outline"
                        placeholder="Search documents, entities, or authors..." :ui="uiSearchConfig" />
                    <USelect v-model="status" :items="statuses" size="lg" class="sm:w-48" />
                    <USelect v-model="entity" :items="entities" size="lg" class="sm:w-48" />
                </div>
            </UCard>

            <Block title="ISSP Documents" description="Manage strategic planning documents across all entities">
                <template #content>
                    <div class="space-y-4">
                        <CardDocument v-for="(doc, idx) in documents" :key="doc.title + idx" :document="doc" />
                    </div>
                </template>
            </Block>

            <Block title="Approval Workflow" description="Track document progression through review stages">
                <template #content>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <CardCustom v-for="card in customCards" :key="card.title" v-bind="card"
                            @button-click="handleClick(card.title)" />
                    </div>
                </template>
            </Block>

            <!-- <Block title="Templates" description="Add and Manage ISSP document templates">
                <template #actions>
                    <UModal v-model:open="templateModalOpen" title="Document Template Creator"
                        description="Create reusable document templates for ISSP documents" :ui="uiTemplateModal">
                        <UButton icon="i-lucide-panels-top-left" size="lg" color="neutral" variant="outline"
                            class="w-full md:w-auto justify-center">Template Creator</UButton>
                        <template #body>
                            <FormTemplateCreator :template="editingTemplate" @create="handleCreateTemplate"
                                @cancel="() => { templateModalOpen = false; editingTemplate = null }" />
                        </template>
                    </UModal>
                </template>
                <template #content>
                    <div class="space-y-4 mt-2">
                        <CardTemplate v-for="(tpl, idx) in templates" :key="tpl.name + idx" :template="tpl"
                            :ui="uiCardConfig" @edit="onEditTemplate(tpl, idx)" />
                        <div v-if="!templates.length" class="text-sm text-gray-400 text-center py-8">
                            No templates yet. Click "Template Creator" above to add one.
                        </div>
                    </div>
                </template>
            </Block> -->
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    auth:false      
})

const cardStats = [
    {
        icon: 'i-lucide-circle-check-big',
        iconColor: 'text-green-500 dark:text-green-700',
        label: 'Approved',
        value: '1'
    },
    {
        icon: 'i-lucide-clock',
        iconColor: 'text-blue-500 dark:text-blue-700',
        label: 'Under Review',
        value: '1'
    },
    {
        icon: 'i-lucide-square-pen',
        iconColor: 'text-yellow-500 dark:text-yellow-700',
        label: 'Drafts',
        value: '1'
    },
    {
        icon: 'i-lucide-circle-alert',
        iconColor: 'text-red-500 dark:text-red-700',
        label: 'Needs Action',
        value: '3'
    }
]

type StatusType = 'Approved' | 'Under Review' | 'Draft' | 'Rejected'

const documents: Array<{
    title: string
    status: StatusType
    entity: string
    author: string
    version: string
    lastModified: string
    progress: number
    comments: number
}> = [
    {
        title: 'College of Engineering ISSP 2024-2028',
        status: 'Under Review',
        entity: 'College of Engineering',
        author: 'Dr. Maria Santos',
        version: 'v2.1',
        lastModified: '2024-12-01',
        progress: 85,
        comments: 3
    },
    {
        title: 'IT Services Strategic Plan',
        status: 'Approved',
        entity: 'IT Services Department',
        author: 'Mr. Carlos Reyes',
        version: 'v1.0',
        lastModified: '2024-11-28',
        progress: 100,
        comments: 4
    },
    {
        title: 'Library System Digital Transformation',
        status: 'Draft',
        entity: 'University Library',
        author: 'Ms. Ana Garcia',
        version: 'v0.3',
        lastModified: '2024-11-30',
        progress: 45,
        comments: 1
    },
    {
        title: 'Business Office Information Systems Plan',
        status: 'Rejected',
        entity: 'Business Office',
        author: 'Prof. John Cruz',
        version: 'v1.2',
        lastModified: '2024-11-25',
        progress: 75,
        comments: 8
    }
]

const customCards = [
    {
        title: 'Review Stage',
        description: '1 documents awaiting review',
        buttonText: 'View Queue',
        buttonColor: 'border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 dark:hover:bg-blue-800 dark:hover:border-blue-500 dark:hover:text-blue-100',
        titleColor: 'text-blue-800 dark:text-blue-200',
        descriptionColor: 'text-blue-500 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-950/10',
        borderColor: 'ring-blue-200 dark:ring-blue-800/50'
    },
    {
        title: 'Approval Stage',
        description: '1 documents approved this month',
        buttonText: 'View Approved',
        buttonColor: 'border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 hover:text-green-800 dark:bg-green-900 dark:text-green-200 dark:border-green-700 dark:hover:bg-green-800 dark:hover:border-green-500 dark:hover:text-green-100',
        titleColor: 'text-green-800 dark:text-green-200',
        descriptionColor: 'text-green-500 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-950/10',
        borderColor: 'ring-green-200 dark:ring-green-800/50'
    },
    {
        title: 'Revision Stage',
        description: '3 documents need attention',
        buttonText: 'View Issues',
        buttonColor: 'border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 hover:text-red-800 dark:bg-red-900 dark:text-red-200 dark:border-red-700 dark:hover:bg-red-800 dark:hover:border-red-500 dark:hover:text-red-100',
        titleColor: 'text-red-800 dark:text-red-200',
        descriptionColor: 'text-red-500 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-950/10',
        borderColor: 'ring-red-200 dark:ring-red-800/50'
    }
]

const statuses = ref(['All Status', 'Approved', 'Under Review', 'Draft', 'Rejected'])
const status = ref('All Status')

const entities = ref(['All Entities', 'Engineering', 'IT Services', 'Library', 'Admin Office'])
const entity = ref('All Entities')

const uiCardConfig = {
    body: 'sm:p-3'
}

const uiSearchConfig = {
    root: 'w-full',
}

const uiNewModal = {
    content: 'divide-y-0 max-w-2xl',
    header: 'sm:p-6 space-y-1.5 items-center',
    body: 'pt-0 sm:pt-0',
    title: 'text-2xl font-semibold leading-none',
}

const uiTemplateModal = {
    content: 'divide-y-0 max-w-6xl',
    header: 'sm:p-6 space-y-1.5 items-center',
    body: 'pt-0 sm:pt-0',
    title: 'text-2xl font-semibold leading-none',
}

type Template = {
    name: string
    description: string
    sections: Array<any>
}

type EditingTemplate = Template & { idx?: number }

const templateModalOpen = ref(false)
const templates = ref<Template[]>([])

const editingTemplate = ref<EditingTemplate | null>(null)

function handleCreateTemplate(template: Template) {
    if (editingTemplate.value && typeof editingTemplate.value.idx === 'number') {
        templates.value[editingTemplate.value.idx] = template
    } else {
        templates.value.push(template)
    }
    templateModalOpen.value = false
    editingTemplate.value = null
}

function onEditTemplate(template: Template, idx: number) {
    editingTemplate.value = { ...template, idx }
    templateModalOpen.value = true
}

// Add this function to handle card button clicks
function handleClick(title: string) {
    // You can implement your logic here, e.g., show a notification or navigate
    // For now, just log the title
    console.log('Card button clicked:', title)
}
</script>