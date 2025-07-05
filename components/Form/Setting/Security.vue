<template>
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Session Timeout (minutes)" size="lg">
                <UInputNumber :default-value="0" class="w-full" />
            </UFormField>
            <UFormField label="Maximum Login Attempts" size="lg">
                <UInputNumber :default-value="0" class="w-full" />
            </UFormField>
        </div>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Require 2FA for all users</p>
                </div>
                <USwitch size="lg" default-value />
            </div>
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100">IP Restriction</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Limit access to university network</p>
                </div>
                <USwitch size="lg" default-value />
            </div>
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100">Audit Logging</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Log all user activities</p>
                </div>
                <USwitch size="lg" default-value />
            </div>
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100">Document Encryption</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Encrypt exported documents</p>
                </div>
                <USwitch size="lg" default-value />
            </div>
        </div>

        <UFormField label="Allowed IP Ranges" size="lg">
            <UTextarea :rows="4" placeholder="Enter IP ranges separated by commas...
e.g., 192.168.1.0/24, 10.0.0.0/8" class="w-full" />
        </UFormField>

        <div class="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <h4 class="font-medium text-red-800 dark:text-red-200 mb-2">Security Status</h4>
            <ul class="list-disc list-inside text-sm text-red-600 dark:text-red-400">
                <li>Last security scan: 2024-12-01</li>
                <li>Active user sessions: 24</li>
                <li>Failed login attempts (24h): 3</li>
                <li>System uptime: 99.8%</li>
            </ul>
        </div>
    </div>
</template>