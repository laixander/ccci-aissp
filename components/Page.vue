<template>
    <div class="flex-1 p-6 overflow-auto">
         <div class="space-y-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        {{ pageTitle ?? 'Default Page Title' }}
                    </h1>
                    <p class="text-gray-500 dark:text-gray-400 mt-1" v-if="pageDescription">
                        {{ pageDescription }}
                    </p>
                </div>

                <div class="flex flex-col md:flex-row items-center gap-3">
                    <slot name="actions">
                        <!-- Default slot for header actions -->
                    </slot>
                </div>
            </div>
            <slot name="content">
                <!-- Default slot for page content -->
                <p class="text-gray-700">This is the default content area. Replace with your own content.</p>
            </slot>
         </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    pageTitle?: string
    pageDescription?: string
}>()
</script>