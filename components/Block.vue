<template>
    <UCard :ui="uiCardConfig">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="flex flex-col space-y-1.5">
                <h3 class="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <UIcon :name="icon" :class="['w-5 h-5', iconColor]" v-if="icon" />
                    <slot name="title">{{ title }}</slot>
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    <slot name="description">{{ description }}</slot>
                </p>
            </div>
            <div class="flex flex-col md:flex-row items-center gap-3">
                <slot name="actions">
                    <!-- Default slot for header actions -->
                </slot>
            </div>
        </div>
        <div class="pt-0">
            <slot name="content">
                <p class="text-gray-700 dark:text-gray-300">This is the default content area. Replace with your own content.</p>
            </slot>
        </div>
    </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: 'Section Title' },
  description: { type: String, default: 'Section description.' },
  icon: { type: String, default: '' },
  iconColor: { type: String, default: 'text-gray-800 dark:text-gray-200' }
})

const uiCardConfig = {
  body: 'space-y-6',
}
</script>