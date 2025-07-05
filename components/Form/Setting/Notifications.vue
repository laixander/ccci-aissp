<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <div class="flex items-center justify-between">
            <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">Daily Email Digest</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Receive daily summary of ISSP activities</p>
            </div>
            <USwitch size="lg" default-value />
            </div>
            <div class="flex items-center justify-between">
            <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">Document Updates</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Get notified when documents are updated</p>
            </div>
            <USwitch size="lg" default-value />
            </div>
            <div class="flex items-center justify-between">
            <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">Approval Reminders</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Reminders for pending approvals</p>
            </div>
            <USwitch size="lg" default-value />
            </div>
            <div class="flex items-center justify-between">
            <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">System Alerts</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Critical system maintenance notifications</p>
            </div>
            <USwitch size="lg" default-value />
            </div>
            <div class="flex items-center justify-between">
            <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">Weekly Reports</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Weekly progress and analytics reports</p>
            </div>
            <USwitch size="lg" default-value />
            </div>
        </div>
        <USeparator />
        <UFormField label="Email Notification Schedule" size="lg">
            <USelect v-model="value" :items="notification" class="w-full" />
        </UFormField>
    </div>
</template>

<script setup lang="ts">
const notification = ref(['Immediate', 'Hourly Digest', 'Daily Digest (Morning)', 'Daily Digest (Evening)', 'Weekly Digest'])
const value = ref('Immediate')
</script>