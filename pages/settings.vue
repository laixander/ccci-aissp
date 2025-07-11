<template>
    <Page 
        page-title="System Settings" 
        page-description="Configure system preferences and integrations">
        <template #actions>
            <UButton 
                icon="i-lucide-refresh-cw" size="lg" color="neutral" variant="outline"
                class="w-full lg:w-auto justify-center">Reset to Defaults</UButton>
            <UButton icon="i-lucide-save" size="lg" color="primary" variant="solid" class="w-full lg:w-auto justify-center">
                Save Changes</UButton>
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
                            <!-- <div class="space-y-3">
                                <h4 class="font-medium text-gray-900">Existing Entities</h4>

                                <CardEntity 
                                    v-for="entity in entities" :key="entity.code" :name="entity.name"
                                    :code="entity.code" :active="entity.active" />
                            </div> -->
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

                <!-- <template #layout>
                    <Block 
                        title="ISSP Layout Customization"
                        description="Customize the appearance and structure of ISSP documents" 
                        icon="i-lucide-palette"
                        icon-color="text-gray-800 dark:text-gray-100">
                        <template #content>
                            <FormSettingLayout />
                        </template>
                    </Block>
                </template> -->

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

                <!-- <template #notifications>
                    <Block 
                        title="Notification Preferences"
                        description="Configure email and system notifications" icon="i-lucide-bell"
                        icon-color="text-gray-800 dark:text-gray-100">
                        <template #content>
                            <FormSettingNotifications />
                        </template>
                    </Block>
                </template>

                <template #security>
                    <Block 
                        title="Security & Access Control"
                        description="Configure security policies and access controls" icon="i-lucide-shield"
                        icon-color="text-gray-800 dark:text-gray-100">
                        <template #content>
                            <FormSettingSecurity />
                        </template>
                    </Block>
                </template> -->
            </UTabs>
        </template>
    </Page>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
// import { FormSettingLayout, FormSettingNotifications } from '#components'
// If you use Nuxt 3 with auto-imported components, you can remove this import line entirely.
// Otherwise, import the components directly by their relative paths, for example:
// import FormSettingLayout from '~/components/FormSettingLayout.vue'
// import FormSettingNotifications from '~/components/FormSettingNotifications.vue'

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
    // {
    //     label: 'Layout',
    //     slot: 'layout' as const
    // },
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
    // {
    //     label: 'Notifications',
    //     slot: 'notifications' as const
    // },
    // {
    //     label: 'Security',
    //     slot: 'security' as const
    // }
] satisfies TabsItem[]

// const entities = [
//     { name: "College of Engineering", code: "COE" },
//     { name: "College of Business", code: "COB" },
//     { name: "IT Services Department", code: "ITS" },
//     { name: "University Library", code: "LIB" },
//     { name: "Finance Office", code: "FIN" },
//     { name: "Graduate School", code: "GRAD", active: false }
// ]

onActivated(async()=>{

})
</script>