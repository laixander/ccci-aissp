<template>
    <div class="py-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/75">
        <UBreadcrumb :items="items" :ui="{ link: 'text-xs' }">
            <template #separator>
                <span class="text-xs mx-2 text-muted dark:text-gray-400">/</span>
            </template>
        </UBreadcrumb>
    </div>
    <Page page-title="Generated Document" page-description="View and manage generated ISSP documents">
        <template #actions>
            <!-- Actions Goes Here -->
        </template>
        <template #content>
            <UCard>
                Hello World
            </UCard>
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    auth: false
})

import type { BreadcrumbItem } from '@nuxt/ui'
const items = ref<BreadcrumbItem[]>([
    {
        label: 'Plans',
        to: '/app/plans'
    },
    // ISSP Document Creator
    {
        label: 'ISSP Document Creator',
        to: '/app/plans/new'
    },
    {
        label: 'Generated Document',
    }
])
</script>