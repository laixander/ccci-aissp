<template>
    <Page page-title="Dashboard" page-description="Overview of your ISSP management activities">
        <template #actions>
            <UButton label="Export Report" icon="i-lucide-download" size="lg" color="neutral" variant="outline"
                class="w-full md:w-auto justify-center" />
            <!-- Modal -->
            <FormNewDocument />
        </template>
        <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardWidget v-for="(widget, index) in widgets" :key="index" v-bind="widget" />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Block title="Recent Activity" description="Latest actions across all entities" icon="i-lucide-clock">
                    <template #content>
                        <div class="space-y-4">
                            <CardActivity v-for="(activity, index) in activityCards" :key="index" v-bind="activity" />
                        </div>
                    </template>
                </Block>

                <Block title="Approval Queue" description="Documents awaiting your review" icon="i-lucide-circle-alert">
                    <template #content>
                        <div class="space-y-4">
                            <CardQueue v-for="(item, index) in queueCards" :key="index" v-bind="item" />
                        </div>
                    </template>
                </Block>
            </div>

            <Block title="AI Suggestions" description="Smart recommendations to improve your ISSPs" icon="i-lucide-bot"
                icon-color="text-purple-500">
                <template #content>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <UAlert title="Content Enhancement"
                            description="3 documents could benefit from expanded strategic objectives" color="violet"
                            variant="subtle" :ui="{ title: 'text-md' }" :actions="[
                                {
                                    label: 'Review Suggestions',
                                    color: 'violet',
                                    variant: 'subtle',
                                    size: 'lg'
                                }
                            ]" />
                        <UAlert title="Compliance Check" description="2 ISSPs need DICT guideline alignment updates"
                            color="secondary" variant="subtle" :ui="{ title: 'text-md' }" :actions="[
                                {
                                    label: 'View Details',
                                    color: 'secondary',
                                    variant: 'subtle',
                                    size: 'lg'
                                }
                            ]" />
                        <UAlert title="Budget Optimization"
                            description="Potential savings of ₱2.3M identified across 5 entities" color="success"
                            variant="subtle" :ui="{ title: 'text-md' }" :actions="[
                                {
                                    label: 'Explore Options',
                                    color: 'success',
                                    variant: 'subtle',
                                    size: 'lg'
                                }
                            ]" />
                    </div>
                </template>
            </Block>

            <Block title="System-wide Progress" description="Overall completion status across all entities">
                <template #content>
                    <div class="space-y-4">
                        <BaseProgress v-for="(item, index) in progressBars" :key="index" v-bind="item" color="neutral" />
                    </div>
                </template>
            </Block>
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
})

import { widgets, activityCards, queueCards } from '~/data/cards'
import { progressBars } from '~/data/components'
</script>