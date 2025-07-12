<template>
    <div class="space-y-4">
        <UCard :ui="uiCardConfig">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-circle-check-big" class="w-5 h-5 text-green-600" />
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100">Executive Summary</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">complete</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <p class="text-sm font-medium">100%</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Compliant</p>
                    </div>
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full bg-green-500"
                            style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </UCard>
        <UCard :ui="uiCardConfig">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-circle-check-big" class="w-5 h-5 text-green-600" />
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100">Situational Analysis</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">complete</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <p class="text-sm font-medium">95%</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Compliant</p>
                    </div>
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full bg-green-500"
                            style="width: 95%;"></div>
                    </div>
                </div>
            </div>
        </UCard>
        <UCard :ui="uiCardConfig">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-triangle-alert" class="w-5 h-5 text-yellow-600" />
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100">Strategic Direction</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">incomplete</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <p class="text-sm font-medium">70%</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Compliant</p>
                    </div>
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full bg-yellow-500"
                            style="width: 70%;"></div>
                    </div>
                </div>
            </div>
        </UCard>
        <UCard :ui="uiCardConfig">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-circle-check-big" class="w-5 h-5 text-green-600" />
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100">Implementation Plan</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">complete</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <p class="text-sm font-medium">88%</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Compliant</p>
                    </div>
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full bg-yellow-500"
                            style="width: 88%;"></div>
                    </div>
                </div>
            </div>
        </UCard>
        <UCard :ui="uiCardConfig">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-triangle-alert" class="w-5 h-5 text-yellow-600" />
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100">Budget &amp; Resources</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">incomplete</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <p class="text-sm font-medium">65%</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Compliant</p>
                    </div>
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full bg-red-500"
                            style="width: 65%;"></div>
                    </div>
                </div>
            </div>
        </UCard>
        <UCard :ui="uiCardConfig">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-triangle-alert" class="w-5 h-5 text-red-600" />
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100">Risk Management</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">missing</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <p class="text-sm font-medium">0%</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Compliant</p>
                    </div>
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full bg-red-500"
                            style="width: 0%;"></div>
                    </div>
                </div>
            </div>
        </UCard>
        <UCard :ui="uiCardConfig">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-circle-check-big" class="w-5 h-5 text-green-600" />
                    <div>
                        <p class="font-medium text-gray-800 dark:text-gray-100">Performance Metrics</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">complete</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <p class="text-sm font-medium">92%</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Compliant</p>
                    </div>
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full bg-green-500"
                            style="width: 92%;"></div>
                    </div>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
const uiCardConfig = {
    body: 'sm:p-4'
}
</script>