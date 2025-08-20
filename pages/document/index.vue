<template>
    <Page page-title="ISSP Document Management"
        page-description="Create, review, and manage Information Systems Strategic Plans">
        <template #actions>
            <UButton label="Create Collection" icon="i-lucide-folder" size="lg" class="w-full lg:w-auto justify-center"
                to="" />
        </template>
        <template #content>
            <!-- Stats -->
            <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardStat v-for="stat in cardStats" :key="stat.label" v-bind="stat" />
            </div> -->

            <!-- Search Bar -->
            <UCard>
                <div class="flex flex-col sm:flex-row gap-4">
                    <UInput icon="i-lucide-search" size="lg" variant="outline"
                        placeholder="Search documents, entities, or authors..." :ui="uiSearchConfig" />
                    <USelect v-model="status" :items="statuses" size="lg" class="sm:w-48" />
                    <USelect v-model="entity" :items="entities" size="lg" class="sm:w-48" />
                </div>
            </UCard>

            <!-- Section -->
            <Block title="Collections" description="Organize and access key planning documents in one place">
                <template #content>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <UCard v-for="n in 7" :key="n">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-folder"
                                        class="flex shrink-0 size-6 text-yellow-500 dark:text-yellow-700" />
                                    <span class="font-semibold text-sm text-toned">
                                        Title of the Collection
                                    </span>
                                </div>
                                <UDropdownMenu 
                                :items="collectionActions" 
                                :content="{
                                    align: 'end',
                                    side: 'bottom',
                                    sideOffset: 8
                                }">
                                    <UButton icon="i-lucide-ellipsis" color="neutral" variant="link" />
                                </UDropdownMenu>
                            </div>
                        </UCard>
                        <!-- Cards -->
                    </div>
                </template>
            </Block>

            <Block title="Recent Activities" description="View the most recent updates and actions taken">
                <template #content>
                    <div class="space-y-4">
                        <CardDocument v-for="(doc, index) in documents" :key="index" v-bind="doc"
                            :status="(doc.status as 'Approved' | 'Under Review' | 'Draft' | 'Rejected')" />
                    </div>
                </template>
            </Block>

        </template>
    </Page>
</template>

<script setup lang="ts">
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

import type { DropdownMenuItem } from '@nuxt/ui'

const collectionActions = ref<DropdownMenuItem[]>([
    {
        label: 'Open',
        icon: 'i-lucide-folder-open',
        to: '/document/collection'
    },
    {
        label: 'Edit',
        icon: 'i-lucide-edit'
    },
    {
        label: 'Archive',
        icon: 'i-lucide-inbox'
    },
    {
        label: 'Delete',
        icon: 'i-lucide-trash-2'
    }
])

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
</script>