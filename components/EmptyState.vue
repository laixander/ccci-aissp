<template>
    <div v-if="show" class="text-center py-12">
        <UIcon :name="icon" class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-700" />
        <h3 v-if="title" class="font-medium text-xl text-gray-500 dark:text-gray-400 mt-3">{{ title }}</h3>
        <p v-if="description" class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    show: {
        type: Boolean,
        required: true
    },
    icon: {
        type: String,
        default: 'i-lucide-file-plus'
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
});
</script>