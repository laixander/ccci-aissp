<template>
    <div class="py-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/75">
        <UBreadcrumb :items="items" :ui="{ link: 'text-xs' }">
            <template #separator>
                <span class="text-xs mx-2 text-muted dark:text-gray-400">/</span>
            </template>
        </UBreadcrumb>
    </div>
    <Page page-title="ISSP Document Creator" page-description="Create reusable document templates for ISSP documents">
        <template #actions>
            <UButton icon="i-lucide-file-cog" size="lg" color="primary" variant="solid" class="w-full lg:w-auto justify-center">
                Generate Document</UButton>
        </template>
        <template #content>
            <div class="grid xl:flex gap-6">
                <DocumentDetails />
                <DocumentSections />
            </div>
            <div class="flex gap-4 w-full justify-end">
                <UButton color="neutral" label="Cancel" size="lg" variant="outline" />
                <UButton color="primary" label="Create Template" size="lg" />
            </div>
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

import { inject, onMounted } from 'vue'
import type { BreadcrumbItem } from '@nuxt/ui'
const items = ref<BreadcrumbItem[]>([
    {
        label: 'Plans',
        to: '/app/plans'
    },
    {
        label: 'ISSP Document Creator',
    }
])



// Inject the sidebar toggle
const toggleSidebar = inject<Ref<boolean>>('toggleSidebar')

onMounted(() => {
  if (toggleSidebar) toggleSidebar.value = true // Collapse sidebar on mount
})
</script>