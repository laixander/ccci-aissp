<template>
    <UCard variant="soft" class="w-full">
        <template #header>
            <div class="flex items-center gap-2 font-semibold">
                <UIcon name="i-lucide-file-text" class="size-4" />
                Document Info
            </div>
        </template>
        <div class="*:flex *:items-center *:justify-between w-full space-y-2">
            <div>
                <div class="flex items-center gap-2 text-sm text-dimmed">
                    <UIcon name="i-lucide-file-text" class="size-4" />
                    Title:
                </div>
                <span class="text-sm text-toned">ISSP 2025-2028</span>
            </div>
            <div>
                <div class="flex items-center gap-2 text-sm text-dimmed">
                    <UIcon name="i-lucide-circle-check-big" class="size-4" />
                    Status:
                </div>
                <UBadge label="Draft" variant="soft" color="warning" class="rounded-full" />
            </div>
            <div>
                <div class="flex items-center gap-2 text-sm text-dimmed">
                    <UIcon name="i-lucide-package-2" class="size-4" />
                    Version:
                </div>
                <span class="text-sm text-toned">1.0</span>
            </div>
            <div>
                <div class="flex items-center gap-2 text-sm text-dimmed">
                    <UIcon name="i-lucide-user" class="size-4" />
                    Auhtor:
                </div>
                <span class="text-sm text-toned">John Doe</span>
            </div>
            <div>
                <div class="flex items-center gap-2 text-sm text-dimmed">
                    <UIcon name="i-lucide-calendar" class="size-4" />
                    Date Modified:
                </div>
                <span class="text-sm text-toned">Aug 9, 11:34 AM</span>
            </div>
        </div>
    </UCard>
    <UCard variant="soft" class="w-full mt-4">
        <template #header>
            <div class="flex items-center gap-2 font-semibold">
                <UIcon name="i-lucide-server" class="size-4" />
                Systems
            </div>
        </template>
        <div class="w-full space-y-2">
            <UAlert :ui="uiAlertConfig" variant="soft">
                <template #description>
                   <div class="*:text-sm flex flex-col gap-1">
                        <span>Student Information System</span>
                        <span class="font-bold">₱8,500,000</span>
                    </div>
                </template>
            </UAlert>
            <UAlert :ui="uiAlertConfig" variant="soft">
                <template #description>
                   <div class="*:text-sm flex flex-col gap-1">
                        <span>Learning Management System</span>
                        <span class="font-bold">₱7,800,000</span>
                    </div>
                </template>
            </UAlert>
            <UAlert :ui="uiAlertConfig" variant="soft">
                <template #description>
                   <div class="*:text-sm flex flex-col gap-1">
                        <span>Financial Management System</span>
                        <span class="font-bold">₱3,200,000</span>
                    </div>
                </template>
            </UAlert>
        </div>
    </UCard>
    <UCard variant="soft" class="w-full mt-4">
        <template #header>
            <div class="flex items-center gap-2 font-semibold">
                <UIcon name="i-lucide-chart-no-axes-combined" class="size-4" />
                IT Needs
            </div>
        </template>
        <div class="w-full space-y-2">
            <UAlert :ui="uiAlertConfig" variant="soft">
                <template #description>
                   <div class="*:text-sm flex flex-col gap-1">
                        <span>Laptop Upgrades</span>
                        <span class="font-bold">₱3,000,000</span>
                    </div>
                </template>
            </UAlert>
            <UAlert :ui="uiAlertConfig" variant="soft">
                <template #description>
                   <div class="*:text-sm flex flex-col gap-1">
                        <span>Wi-Fi Expansion</span>
                        <span class="font-bold">₱1,500,000</span>
                    </div>
                </template>
            </UAlert>
            <UAlert :ui="uiAlertConfig" variant="soft">
                <template #description>
                   <div class="*:text-sm flex flex-col gap-1">
                        <span>Cloud Backup Services</span>
                        <span class="font-bold">₱500,000</span>
                    </div>
                </template>
            </UAlert>
        </div>
    </UCard>
    <UCard variant="soft" class="w-full mt-4">
        <template #header>
            <div class="flex items-center gap-2 font-semibold">
                <UIcon name="i-lucide-philippine-peso" class="size-4" />
                Budget Scenario
            </div>
        </template>
        <div class="text-toned font-medium mb-4">
            Standard Implementation
        </div>
        <div class="grid lg:grid-cols-2 gap-4 mb-6">
            <UAlert color="info" variant="soft">
                <template #description>
                    Total Budget
                    <div class="text-2xl font-extrabold">
                        ₱5,500,000
                    </div>
                </template>
            </UAlert>
            <UAlert color="success" variant="soft">
                <template #description>
                    Allocated
                    <div class="text-2xl font-extrabold">
                        ₱4,200,000
                    </div>
                </template>
            </UAlert>
        </div>
        <div class="flex gap-2 text-dimmed text-sm">
            <UIcon name="i-lucide-check-check" class="size-5 shrink-0 flex" />
            <div>The total <strong>MOOE</strong> and <strong>CO</strong> for the selected systems are within your agency’s available budget. No overspending detected.</div>
        </div>
    </UCard>
</template>
<script setup lang="ts">
const uiAlertConfig = {
    root: 'bg-white dark:bg-gray-900/75',
    title: 'text-dimmed',
    description: 'text-toned',
    icon: 'text-toned'
}
</script>