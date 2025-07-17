<template>
    <div class="flex-1 p-6 overflow-auto">
         <div class="space-y-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        {{ pageTitle }}
                    </h1>
                    <p v-if="pageDescription" class="text-gray-500 dark:text-gray-400 mt-1">
                        {{ pageDescription }}
                    </p>
                </div>
                <template v-if="$slots.actions">
                    <div class="flex flex-col-reverse lg:flex-row justify-end gap-3 *:w-full *:lg:w-auto *:justify-center">
                        <slot name="actions">
                            <!-- Default slot for header actions -->
                        </slot>
                    </div>
                </template>
            </div>
            <slot name="content">
                <!-- Default slot for page content -->
                <p class="text-gray-700">This is the default content area. Replace with your own content.</p>
            </slot>
         </div>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    pageTitle: string
    pageDescription?: string
}>(), {
    pageTitle: '',
    pageDescription: ''
})
</script>