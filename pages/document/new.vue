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
            <UButton label="Cancel" color="neutral" size="lg" variant="ghost" to="/document" />
            <UButton label="Save as Draft" icon="i-lucide-save" color="primary" size="lg" />
            <UButton label="Generate Document" icon="i-lucide-file-cog" size="lg" color="success" variant="solid" to="/document/generate" />
        </template>
        <template #content>
            <div class="grid xl:flex gap-6">
                <TemplateDetails class="w-full xl:w-[768px]" />
                <TemplateSections class="w-full" />
            </div>
            <div class="flex flex-col-reverse lg:flex-row justify-end gap-3 *:w-full *:lg:w-auto *:justify-center">
                <UButton label="Cancel" color="neutral" size="lg" variant="ghost" to="/document" />
                <UButton label="Save as Draft" icon="i-lucide-save" color="primary" size="lg" />
                <UButton label="Generate Document" icon="i-lucide-file-cog" color="success" size="lg" to="/document/generate" />
            </div>
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
    {
        label: 'ISSP Document Creator',
    }
])
</script>