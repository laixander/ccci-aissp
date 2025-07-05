<template>
    <UCard :ui="uiCardConfig" class="hover:shadow-md">
        <div class="flex items-center justify-between">
            <div>
                <div class="flex items-center gap-2">
                    <p class="font-medium text-gray-900 dark:text-gray-100">ChatGPT</p> 
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Model: GPT-4 Turbo</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">API Endpoint: https://api.openai.com/v1/chat/completions</p>
            </div>
            <div class="flex items-center gap-3">
                <USwitch size="lg" label="Active" default-value />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const uiCardConfig = {
    body: 'sm:p-4'
}
</script>