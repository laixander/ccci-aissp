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
            <UButton label="Back to Productivity" icon="i-lucide-arrow-left" variant="ghost" color="neutral"
                size="lg" to="/productivity" />
        </template>
        <template #content>
            <div class="grid xl:flex gap-6">
                <div class="w-full space-y-6">
                    <UCard>
                        <div class="space-y-6">
                            <div class="flex flex-col space-y-1.5">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h3 class="font-semibold tracking-tight text-xl">Upgrade laboratory computers
                                        </h3>
                                        <p class="text-sm text-muted-foreground mt-2">Submitted by Dr. Maria Santos from
                                            College of Engineering</p>
                                    </div>
                                    <div class="flex gap-2">
                                        <div
                                            class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-yellow-100 text-yellow-800">
                                            Under Review
                                        </div>
                                        <div
                                            class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-red-100 text-red-800">
                                            High Priority
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-calendar" class="w-4 h-4 text-blue-600" />
                                    <div>
                                        <p class="text-sm font-medium">2024-01-15</p>
                                        <p class="text-xs text-gray-500">Submitted</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-user" class="w-4 h-4 text-green-600" />
                                    <div>
                                        <p class="text-sm font-medium">25</p>
                                        <p class="text-xs text-gray-500">Quantity</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-dollar-sign" class="w-4 h-4 text-purple-600" />
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

                    <UCard>
                        <div class="space-y-6">
                            <h3 class="text-2xl font-semibold leading-none tracking-tight">Request Details</h3>
                            <div class="space-y-4">
                                <div>
                                    <h4 class="font-medium text-gray-900 mb-2">Description</h4>
                                    <p class="text-gray-700 leading-relaxed">
                                        The engineering laboratory requires computer upgrades to support the new CAD
                                        software and simulation tools for the upcoming semester. Current machines are
                                        outdated and causing productivity issues for students and faculty.
                                    </p>
                                </div>
                                <USeparator />
                                <div>
                                    <h4 class="font-medium text-gray-900 mb-2">Business Justification</h4>
                                    <p class="text-gray-700 leading-relaxed">
                                        These upgraded computers will enable students to work more efficiently with
                                        industry-standard software, improving their learning experience and preparing
                                        them better for their careers. The investment will also reduce maintenance costs
                                        and downtime.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </UCard>

                    <Block title="Supporting Documents" description="Attachments and supporting files for this request">
                        <template #content>
                            <div class="space-y-3">
                                <div class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                                    <UIcon name="i-lucide-file-text" class="w-8 h-8 text-blue-600" />
                                    <div class="flex-1">
                                        <p class="font-medium text-gray-900">Hardware_Specifications.pdf</p>
                                        <p class="text-sm text-gray-500">2.4 MB</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <UButton icon="i-lucide-eye" variant="ghost" color="neutral" size="sm" />
                                        <UButton icon="lucide-download" variant="ghost" color="neutral" size="sm" />
                                    </div>
                                </div>

                                <div class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                                    <UIcon name="i-lucide-image" class="w-8 h-8 text-blue-600" />
                                    <div class="flex-1">
                                        <p class="font-medium text-gray-900">Lab_Layout_Diagram.png</p>
                                        <p class="text-sm text-gray-500">1.8 MB</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <UButton icon="i-lucide-eye" variant="ghost" color="neutral" size="sm" />
                                        <UButton icon="lucide-download" variant="ghost" color="neutral" size="sm" />
                                    </div>
                                </div>

                                <div class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                                    <UIcon name="i-lucide-file-spreadsheet" class="w-8 h-8 text-blue-600" />
                                    <div class="flex-1">
                                        <p class="font-medium text-gray-900">Budget_Breakdown.xlsx</p>
                                        <p class="text-sm text-gray-500">456 KB</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <UButton icon="i-lucide-eye" variant="ghost" color="neutral" size="sm" />
                                        <UButton icon="lucide-download" variant="ghost" color="neutral" size="sm" />
                                    </div>
                                </div>

                            </div>
                        </template>
                    </Block>
                </div>
                <div class="w-full xl:w-[768px] space-y-6">
                    <UCard>
                        <ComingSoon />
                    </UCard>
                    <UCard>
                        <ComingSoon />
                    </UCard>
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
</script>