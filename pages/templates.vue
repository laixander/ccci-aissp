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
                        <CardTemplateList />
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
</script>