<template>
    <Page page-title="Dashboard" page-description="Overview of your ISSP management activities">
        <template #actions>
            <UButton label="Export Report" icon="i-lucide-download" size="lg" color="neutral" variant="outline" class="w-full md:w-auto justify-center" />
            <!-- Modal -->
            <FormNewDocument />
        </template>
        <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardWidget v-for="widget in widgets" :key="widget.title" v-bind="widget" />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Block title="Recent Activity" description="Latest actions across all entities" icon="i-lucide-clock">
                    <template #content>
                        <div class="space-y-4">
                            <CardActivity v-for="activity in activities" :key="activity.id" v-bind="activity" :typeColor="activity.typeColor as 'success' | 'info' | 'warning' | 'violet'" />
                        </div>
                    </template>
                </Block>

                <Block title="Approval Queue" description="Documents awaiting your review" icon="i-lucide-circle-alert">
                    <template #content>
                        <div class="space-y-4">
                            <CardQueue 
                                v-for="queue in queues" 
                                :key="queue.name" 
                                v-bind="queue" 
                                :priority="queue.priority as 'High' | 'Medium' | 'Low'"
                            />
                        </div>
                    </template>
                </Block>
            </div>

            <Block title="AI Suggestions" description="Smart recommendations to improve your ISSPs" icon="i-lucide-bot"
                icon-color="text-purple-500">
                <template #content>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <UAlert title="Content Enhancement" description="3 documents could benefit from expanded strategic objectives" color="violet" variant="subtle" 
                            :ui="{ title: 'text-md' }"
                            :actions="[
                                {
                                    label: 'Review Suggestions',
                                    color: 'violet',
                                    variant: 'subtle',
                                    size: 'lg'
                                }
                            ]"
                        />
                        <UAlert title="Compliance Check" description="2 ISSPs need DICT guideline alignment updates" color="secondary" variant="subtle" 
                            :ui="{ title: 'text-md' }"
                            :actions="[
                                {
                                    label: 'View Details',
                                    color: 'secondary',
                                    variant: 'subtle',
                                    size: 'lg'
                                }
                            ]"
                        />
                        <UAlert title="Budget Optimization" description="Potential savings of ₱2.3M identified across 5 entities" color="success" variant="subtle" 
                            :ui="{ title: 'text-md' }"
                            :actions="[
                                {
                                    label: 'Explore Options',
                                    color: 'success',
                                    variant: 'subtle',
                                    size: 'lg'
                                }
                            ]"
                        />
                    </div>
                </template>
            </Block>

            <Block title="System-wide Progress" description="Overall completion status across all entities">
                <template #content>
                    <div class="space-y-4">
                        <BaseProgress 
                            v-for="progress in baseProgress"
                            :key="progress.label"
                            v-bind="progress"
                            color="neutral"
                        />
                    </div>
                </template>
            </Block>
        </template>
    </Page>
</template>

<script setup lang="ts">
import { id } from '@nuxt/ui/runtime/locale/index.js'

definePageMeta({
    layout: 'dashboard',
})

const baseProgress = [
    {
        label: 'ISSP Development',
        value: 75
    },
    {
        label: 'Review Process',
        value: 60
    },
    {
        label: 'Final Approval',
        value: 45
    }
]

const widgets = [
    {
        title: 'Total ISSPs',
        value: 24,
        percentageChange: 12,
        changeType: 'increase',
        iconName: 'i-lucide-file-text',
        iconColor: 'text-white dark:text-blue-100',
        iconBgColor: 'bg-blue-500 dark:bg-blue-800'
    },
    {
        title: 'Approved',
        value: 18,
        percentageChange: 8,
        changeType: 'increase',
        iconName: 'i-lucide-circle-check-big',
        iconColor: 'text-white dark:text-green-100',
        iconBgColor: 'bg-green-500 dark:bg-green-800'
    },
    {
        title: 'Pending Review',
        value: 5,
        percentageChange: 2,
        changeType: 'decrease',
        iconName: 'i-lucide-clock',
        iconColor: 'text-white dark:text-yellow-100',
        iconBgColor: 'bg-yellow-500 dark:bg-yellow-700'
    },
    {
        title: 'Rejected',
        value: 1,
        percentageChange: 0,
        changeType: 'increase',
        iconName: 'i-lucide-circle-x',
        iconColor: 'text-white dark:text-red-100',
        iconBgColor: 'bg-red-500 dark:bg-red-800'
    }
]


const activities = [
    {
        id: 1,
        title: 'ISSP approved',
        description: 'College of Engineering',
        timeAgo: '2 hours ago',
        typeColor: 'success'
    },
    {
        id: 2,
        title: 'Document exported',
        description: 'IT Services',
        timeAgo: '4 hours ago',
        typeColor: 'info'
    },
    {
        id: 3,
        title: 'Review requested',
        description: 'Library System',
        timeAgo: '6 hours ago',
        typeColor: 'warning'
    },
    {
        id: 4,
        title: 'AI suggestions generated',
        description: 'Business Office',
        timeAgo: '1 day ago',
        typeColor: 'violet'
    }
]

const queues = [
    {
        name: 'College of Arts & Sciences',
        date: 'Dec 15, 2024',
        icon: 'i-lucide-calendar',
        priority: 'High'
    },
    {
        name: 'Graduate School',
        date: 'Dec 20, 2024',
        icon: 'i-lucide-calendar',
        priority: 'Medium'
    },
    {
        name: 'Research Division',
        date: 'Jan 5, 2025',
        icon: 'i-lucide-calendar',
        priority: 'Low'
    }
]

// Handle button click for custom cards
function handleClick(type: string) {
    alert(`Button clicked for: ${type}`)
}
</script>