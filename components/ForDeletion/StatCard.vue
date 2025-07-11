<template>
    <div>
        <div class="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <div :class="`flex items-center justify-center w-12 h-12 rounded-lg ${iconBgColor}`" class="mr-4">
                <UIcon :name="iconName" :class="['size-6', iconColor]" />
            </div>
            <div>
                <p class="text-sm font-medium text-gray-500">{{ title }}</p>
                <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Number],
        required: true,
    },
    /**
     * The name of the icon to display (e.g., 'i-heroicons-light-bulb')
     */
    iconName: {
        type: String,
        required: true,
    },
    /**
     * The Tailwind CSS class for the icon's color (e.g., 'text-blue-500')
     */
    iconColor: {
        type: String,
        default: 'text-gray-600',
    },
    /**
     * The Tailwind CSS class for the icon's background color (e.g., 'bg-blue-50')
     */
    iconBgColor: {
        type: String,
        default: 'bg-gray-100',
    }
});
</script>