<template>
    <Page page-title="Dashboard" page-description="Overview of your ISSP management activities">
        <template #actions>
            <UButton 
                icon="i-lucide-download" size="lg" color="neutral" variant="outline"
                class="w-full md:w-auto justify-center">Export Report</UButton>

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
                            <CardActivity v-for="activity in activities" :key="activity.title" v-bind="activity" />
                        </div>
                    </template>
                </Block>

                <Block title="Approval Queue" description="Documents awaiting your review" icon="i-lucide-circle-alert">
                    <template #content>
                        <div class="space-y-4">
                            <CardQueue v-for="queue in queues" :key="queue.name" v-bind="queue" />
                        </div>
                    </template>
                </Block>
            </div>

            <Block 
                title="AI Suggestions" 
                description="Smart recommendations to improve your ISSPs" icon="i-lucide-bot"
                icon-color="text-purple-500">
                <template #content>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <CardCustom 
                            v-for="card in customCards" :key="card.title" 
                            v-bind="card"
                            @button-click="handleClick(card.title)" />
                    </div>
                </template>
            </Block>

            <Block title="System-wide Progress" description="Overall completion status across all entities">
                <template #content>
                    <div class="space-y-4">
                        <ProgressBar label="ISSP Development" :value="75" />
                        <ProgressBar label="Review Process" :value="60" />
                        <ProgressBar label="Final Approval" :value="45" />
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
        title: 'ISSP approved',
        description: 'College of Engineering',
        timeAgo: '2 hours ago',
        statusColor: 'bg-green-500 dark:bg-green-700'
    },
    {
        title: 'Document exported',
        description: 'IT Services',
        timeAgo: '4 hours ago',
        statusColor: 'bg-blue-500 dark:bg-blue-700'
    },
    {
        title: 'Review requested',
        description: 'Library System',
        timeAgo: '6 hours ago',
        statusColor: 'bg-yellow-500 dark:bg-yellow-700'
    },
    {
        title: 'AI suggestions generated',
        description: 'Business Office',
        timeAgo: '1 day ago',
        statusColor: 'bg-purple-500 dark:bg-purple-700'
    }
]

const queues = [
    {
        name: 'College of Arts & Sciences',
        date: 'Dec 15, 2024',
        icon: 'i-lucide-calendar',
        priority: 'high'
    },
    {
        name: 'Graduate School',
        date: 'Dec 20, 2024',
        icon: 'i-lucide-calendar',
        priority: 'medium'
    },
    {
        name: 'Research Division',
        date: 'Jan 5, 2025',
        icon: 'i-lucide-calendar',
        priority: 'low'
    }
]

const customCards = [
    {
        title: 'Content Enhancement',
        description: '3 documents could benefit from expanded strategic objectives',
        buttonText: 'Review Suggestions'
        // default colors
    },
    {
        title: 'Compliance Check',
        description: '2 ISSPs need DICT guideline alignment updates',
        buttonText: 'View Details',
        buttonColor: 'border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 dark:hover:bg-blue-800 dark:hover:border-blue-500 dark:hover:text-blue-100',
        titleColor: 'text-blue-800 dark:text-blue-200',
        descriptionColor: 'text-blue-500 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-950/10',
        borderColor: 'ring-blue-200 dark:ring-blue-800/50'
    },
    {
        title: 'Budget Optimization',
        description: 'Potential savings of ₱2.3M identified across 5 entities',
        buttonText: 'Explore Options',
        buttonColor: 'border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 hover:text-green-800 dark:bg-green-900 dark:text-green-200 dark:border-green-700 dark:hover:bg-green-800 dark:hover:border-green-500 dark:hover:text-green-100',
        titleColor: 'text-green-800 dark:text-green-200',
        descriptionColor: 'text-green-500 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-950/10',
        borderColor: 'ring-green-200 dark:ring-green-800/50'
    }
]

// Handle button click for custom cards
function handleClick(type: string) {
    alert(`Button clicked for: ${type}`)
}

const uiModalConfig = {
    content: 'divide-y-0 max-w-2xl',
    header: 'sm:p-6 space-y-1.5 items-center',
    body: 'pt-0 sm:pt-0',
    title: 'text-2xl font-semibold leading-none',
}
</script>