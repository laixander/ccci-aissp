<template>
    <div class="py-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/75">
        <UBreadcrumb :items="items" :ui="{ link: 'text-xs' }">
            <template #separator>
                <span class="text-xs mx-2 text-muted dark:text-gray-400">/</span>
            </template>
        </UBreadcrumb>
    </div>
    <Page page-title="Collection Details" page-description="View and manage documents in this collection">
        <template #actions>
            <UButton label="Bulk Report" icon="i-lucide-download" size="lg" color="neutral" variant="outline"
                class="w-full lg:w-auto justify-center" />
            <UButton label="New ISSP Document" icon="i-lucide-file-text" size="lg"
                class="w-full lg:w-auto justify-center" to="/document/create" />
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

            <Block title="Approval Workflow" description="Track document progression through review stages">
                <!-- Tabs inside Block actions -->
                <template #actions>
                    <UTabs v-model="activeTab" :items="workflows" color="neutral" class="w-full" />
                </template>

                <!-- Tab content inside Block content -->
                <template #content>
                    <!-- Card View -->
                    <div v-if="activeTab === 'cards'" class="space-y-4">
                        <CardDocument v-for="(doc, index) in documents" :key="index" v-bind="doc"
                            :status="(doc.status as 'Approved' | 'Under Review' | 'Draft' | 'Rejected')" />
                    </div>

                    <!-- Kanban Board -->
                    <div v-else-if="activeTab === 'kanban'" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div v-for="(stage, sIndex) in stages" :key="stage.name">
                            <UCard variant="soft" :ui="{ body: 'space-y-2' }">
                                <template #header>
                                    <div class="flex justify-between items-center">
                                        <div class="flex items-center gap-2">
                                            <UIcon :name="stage.icon" class="size-5 shrink-0"
                                                :class="stage.iconColor" />
                                            <span class="font-semibold">{{ stage.name }}</span>
                                        </div>
                                        <UBadge variant="soft" color="neutral" class="rounded-full">
                                            {{ stage.items.length }}
                                        </UBadge>
                                    </div>
                                </template>

                                <!-- Draggable area -->
                                <draggable v-model="stage.items" :group="{ name: 'kanban', pull: true, put: true }"
                                    item-key="id" class="space-y-2">
                                    <template #item="{ element }">
                                        <UCard>
                                            <div class="space-y-1">
                                                <div class="font-semibold text-default">{{ element.title }}</div>
                                                <div class="text-sm text-dimmed">{{ element.subtitle }}</div>
                                            </div>
                                            <div class="flex items-center justify-between mt-2">
                                                <UBadge :label="element.badge" variant="soft" color="neutral"
                                                    class="rounded-full" />
                                                <UButton :label="element.action" size="sm" color="neutral"
                                                    variant="ghost" class="rounded-full" @click="handleViewClick" />
                                            </div>
                                        </UCard>
                                    </template>
                                </draggable>
                            </UCard>
                        </div>
                    </div>
                </template>
            </Block>


        </template>
    </Page>
    <!-- Modal -->
    <UModal v-model:open="isModalOpen" fullscreen>
        <template #content="{ close }">
            <TipTapEditor :show-details="showDetails" @close="close" />
        </template>
    </UModal>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

definePageMeta({
    layout: 'dashboard',
    auth: false
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

const documents = [
    {
        title: 'College of Engineering ISSP 2024-2028',
        status: 'Under Review',
        entity: 'College of Engineering',
        author: 'Dr. Maria Santos',
        version: 'v2.1',
        lastModified: '2024-12-01',
        progress: 85,
        justifyStart: true,
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
        justifyStart: true,
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
        justifyStart: true,
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
        justifyStart: true,
        comments: 8
    }
]

function handleApply(type: string) {
    console.log(`Button clicked for ${type}`)
}

function handleDismiss(type: string) {
    console.log(`Button clicked for ${type}`)
}

const statuses = ref(['All Status', 'Approved', 'Under Review', 'Draft', 'Rejected'])
const status = ref('All Status')

const entities = ref(['All Entities', 'Engineering', 'IT Services', 'Library', 'Admin Office'])
const entity = ref('All Entities')

const uiSearchConfig = {
    root: 'w-full',
}

const uiCardConfig = {
    body: 'sm:p-3'
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

const stages = ref([
    {
        name: 'Review Stage',
        icon: 'i-lucide-file-search',
        iconColor: 'text-blue-500',
        items: [
            {
                id: 1,
                title: 'College of Engineering ISSP 2024-2028',
                subtitle: 'Due: 2024-12-01',
                badge: 'College of Engineering',
                action: 'Review'
            }
        ]
    },
    {
        name: 'Approval Stage',
        icon: 'i-lucide-badge-check',
        iconColor: 'text-green-500',
        items: [
            {
                id: 2,
                title: 'IT Services Strategic Plan',
                subtitle: 'Approved: 2024-11-28',
                badge: 'IT Services Department',
                action: 'View'
            }
        ]
    },
    {
        name: 'Revision Stage',
        icon: 'i-lucide-pencil',
        iconColor: 'text-yellow-500',
        items: [
            {
                id: 3,
                title: 'College of Engineering ISSP 2024-2028',
                subtitle: 'Issues: 3 comments',
                badge: 'College of Engineering',
                action: 'Fix'
            },
            {
                id: 4,
                title: 'Library System Digital Transformation',
                subtitle: 'Issues: 1 comment',
                badge: 'University Library',
                action: 'Fix'
            },
            {
                id: 5,
                title: 'Business Office Information Systems Plan',
                subtitle: 'Issues: 8 comments',
                badge: 'Business Office',
                action: 'Fix'
            }
        ]
    }
])

const isModalOpen = ref(false)
const showDetails = ref(false)

function handleViewClick() {
    showDetails.value = true // show details when modal opens
    isModalOpen.value = true
}

import type { BreadcrumbItem } from '@nuxt/ui'
const items = ref<BreadcrumbItem[]>([
    {
        label: 'ISSP Document Management',
        to: '/document'
    },
    {
        label: 'Collection Details'
    }
])

const activeTab = ref('cards')

const workflows = [
    { label: 'Card View', icon: 'i-lucide-credit-card', value: 'cards' },
    { label: 'Kanban Board', icon: 'i-lucide-square-kanban', value: 'kanban' }
]
</script>