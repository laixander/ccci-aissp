<template>
    <div class="py-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/75">
        <UBreadcrumb :items="items" :ui="{ link: 'text-xs' }">
            <template #separator>
                <span class="text-xs mx-2 text-muted dark:text-gray-400">/</span>
            </template>
        </UBreadcrumb>
    </div>
    <Page page-title="New System" page-description="Submit a new system to add on system’s registry">
        <!-- <template #actions>
            <UButton label="Cancel" color="neutral" size="lg" variant="ghost" to="/templates" />
            <UButton label="Save Template" icon="i-lucide-save" color="primary" size="lg" />
        </template> -->
        <template #content>
            <FormSystem />
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
        label: 'System Management',
        to: '/systems'
    },
    {
        label: 'New System',
    }
])
</script>