<template>
    <div class="py-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/75">
        <UBreadcrumb :items="items" :ui="{ link: 'text-xs' }">
            <template #separator>
                <span class="text-xs mx-2 text-muted dark:text-gray-400">/</span>
            </template>
        </UBreadcrumb>
    </div>
    <Page page-title="IT Request Details"
        page-description="Review and manage the details of your ISSP document requests">
        <template #actions>
            <UButton label="Back to Productivity" icon="i-lucide-arrow-left" variant="ghost" color="neutral" size="lg"
                to="/productivity" />
        </template>
        <template #content>
            <div class="grid xl:flex gap-6">
                <div class="w-full space-y-6">
                    <UCard>
                        <div class="space-y-6">
                            <div class="flex flex-col space-y-1.5">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h3 class="text-highlighted font-semibold tracking-tight text-xl">Upgrade
                                            laboratory computers</h3>
                                        <p class="text-sm text-muted mt-2">Submitted by Dr. Maria Santos from College of
                                            Engineering</p>
                                    </div>
                                    <div class="flex gap-2">
                                        <UBadge label="High" color="error" variant="soft" class="rounded-full" />
                                        <UBadge label="Hardware" color="error" class="rounded-full" />
                                        <UBadge label="HRIS" color="neutral" variant="soft" class="rounded-full" />
                                        <UBadge label="CMS" color="neutral" variant="soft" class="rounded-full" />
                                        <UBadge label="ISSP 2024" color="neutral" variant="soft" class="rounded-full" />
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-calendar" class="w-4 h-4 text-blue-600 dark:text-blue-500" />
                                    <div>
                                        <p class="text-sm font-medium">2024-01-15</p>
                                        <p class="text-xs text-gray-500">Submitted</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-user" class="w-4 h-4 text-green-600 dark:text-green-500" />
                                    <div>
                                        <p class="text-sm font-medium">25</p>
                                        <p class="text-xs text-gray-500">Quantity</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-dollar-sign" class="w-4 h-4 text-purple-600 dark:text-purple-500" />
                                    <div>
                                        <p class="text-sm font-medium">₱1,250,000.00</p>
                                        <p class="text-xs text-gray-500">Budget</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-building" class="w-4 h-4 text-orange-600" />
                                    <div>
                                        <p class="text-sm font-medium text-truncate">College of Engineering</p>
                                        <p class="text-xs text-gray-500">Department</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </UCard>

                    <Block title="Request Details">
                        <template #content>
                            <div class="space-y-4">
                                <div>
                                    <h4 class="font-medium text-default mb-2">Description</h4>
                                    <p class="text-muted leading-relaxed">
                                        The engineering laboratory requires computer upgrades to support the new CAD
                                        software and simulation tools for the upcoming semester. Current machines are
                                        outdated and causing productivity issues for students and faculty.
                                    </p>
                                </div>
                                <USeparator />
                                <div>
                                    <h4 class="font-medium text-default mb-2">Business Justification</h4>
                                    <p class="text-muted leading-relaxed">
                                        These upgraded computers will enable students to work more efficiently with
                                        industry-standard software, improving their learning experience and preparing
                                        them better for their careers. The investment will also reduce maintenance costs
                                        and downtime.
                                    </p>
                                </div>
                            </div>
                        </template>
                    </Block>

                    <Block title="Supporting Documents" description="Attachments and supporting files for this request">
                        <template #content>
                            <div class="space-y-3">
                                <CardFile
                                    v-for="file in files"
                                    :key="file.name"
                                    :name="file.name"
                                    :size="file.size"
                                    :file-type="file.type"
                                    @view=""
                                    @download=""
                                />
                            </div>
                        </template>
                    </Block>
                </div>
                <div class="w-full xl:w-[768px] space-y-6">
                    <Block title="Quick Actions">
                        <template #content>
                            <div class="grid gap-3 w-full">
                                <UButton label="Edit Request" icon="i-lucide-edit" variant="outline" color="neutral"
                                    size="lg" class="w-full justify-center" />
                                <UButton label="Delete Request" icon="i-lucide-trash" color="error" size="lg"
                                    class="w-full justify-center" />
                            </div>
                        </template>
                    </Block>
                    <Block title="Review Comments" description="Timeline of review activities">
                        <template #content>
                            <div class="space-y-6">
                                <div class="border-l-3 border-blue-200 dark:border-blue-900/40 pl-4">
                                    <div class="flex items-center gap-2 mb-1">
                                        <UIcon name="i-lucide-message-square" class="w-4 h-4 text-blue-600 dark:text-blue-500" />
                                        <p class="font-medium text-sm text-default">IT Director</p>
                                    </div>
                                    <p class="text-sm text-muted mb-2">2024-01-16</p>
                                    <p class="text-sm text-default">Initial review completed. Specifications look good,
                                        forwarding to budget committee.</p>
                                </div>

                                <div class="border-l-3 border-blue-200 dark:border-blue-900/40 pl-4">
                                    <div class="flex items-center gap-2 mb-1">
                                        <UIcon name="i-lucide-message-square" class="w-4 h-4 text-blue-600 dark:text-blue-500" />
                                        <p class="font-medium text-sm text-default">Budget Manager</p>
                                    </div>
                                    <p class="text-sm text-muted mb-2">2024-01-18</p>
                                    <p class="text-sm text-default">Budget approval pending. Need additional quotes from vendors.</p>
                                </div>
                            </div>
                            <div class="pt-8 space-y-2">
                                <UTextarea placeholder="Add reviews to this request" class="w-full" />
                                <UButton label="Submit Review" color="neutral" size="lg" class="w-full justify-center" />
                            </div>
                        </template>
                    </Block>
                </div>
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
        label: 'IT Needs & Productivity',
        to: '/productivity'
    },
    {
        label: 'Request Details'
    }
])

const files = [
  { name: 'Hardware_Specifications.pdf', size: '2.4 MB', type: 'pdf' },
  { name: 'Lab_Layout_Diagram.png', size: '1.8 MB', type: 'png' },
  { name: 'Budget_Breakdown.xlsx', size: '456 KB', type: 'xlsx' }
]
</script>