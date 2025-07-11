<template>
    <Page page-title="System Settings" page-description="Configure system preferences and integrations">
        <template #actions>
            <UButton label="Reset to Defaults" icon="i-lucide-refresh-cw" size="lg" color="neutral" variant="outline" class="w-full lg:w-auto justify-center" />
            <UButton label="Save Changes" icon="i-lucide-save" size="lg" color="primary" variant="solid" class="w-full lg:w-auto justify-center" />
        </template>
        <template #content>
            <UTabs :items="tabs" variant="pill" color="neutral" class="gap-4 w-full" :ui="{ trigger: 'grow' }">

                <template #entities>
                    <Block 
                        title="Entity (Campus) Management"
                        description="Manage university entities and their access to the ISSP system"
                        icon="i-lucide-building" 
                        icon-color="text-gray-800 dark:text-gray-100">
                        <template #content>
                            <EntitySettings/>
                        </template>
                    </Block>
                </template>

                <template #organizations>
                    <Block 
                        title="Organization Management"
                        description="Manage university organizations"
                        icon="i-ri-organization-chart" 
                        icon-color="text-gray-800 dark:text-gray-100">
                        <template #content>
                            <OrganizationSettings/>
                        </template>
                    </Block>
                </template>

                <template #api>
                    <Block 
                        title="API Configuration"
                        description="Configure integrations with FMS, AMS, and other systems" 
                        icon="i-lucide-link"
                        icon-color="text-gray-800 dark:text-gray-100">
                        <template #content>
                            <APISettings />
                        </template>
                    </Block>
                </template>

                <template #db>
                    <Block 
                        title="Datasources"
                        description="Configure integrations with FMS, AMS, and other systems" 
                        icon="i-lucide-database"
                        icon-color="text-gray-800 dark:text-gray-100">
                        <template #content>
                            <DBSettings />
                        </template>
                    </Block>
                </template>

                <template #ai>
                    <Block 
                        title="AI Integrations"
                        description="Configure your AI provider, model, and credentials to integrate intelligent capabilities into your application." icon="i-lucide-sparkles"
                        icon-color="text-gray-800 dark:text-gray-100">
                        <template #content>
                            <AISettings />
                        </template>
                    </Block>
                </template>

            </UTabs>
        </template>
    </Page>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

definePageMeta({
    layout: 'dashboard',
    auth:false
})

const tabs = [
    {
        label: 'Entities',
        slot: 'entities' as const
    },
    {
        label: 'Organizations',
        slot: 'organizations' as const
    },
    {
        label: 'API Integrations',
        slot: 'api' as const
    },
    {
        label: 'DB Integrations',
        slot: 'db' as const
    },
    {
        label: 'AI Integrations',
        slot: 'ai' as const
    }
] satisfies TabsItem[]
</script>