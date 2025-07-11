<template>
    <div class="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex justify-between items-center">
        <div class="flex flex-col">
            <p class="text-sm font-medium text-gray-500 mb-1">{{ title }}</p>
            <p class="text-3xl font-bold text-gray-800 mb-3">{{ value }}</p>
            <div class="flex items-center text-sm">
                <UIcon 
                    :name="isIncrease ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'" 
                    :class="['size-4 mr-1', isIncrease ? 'text-green-500' : 'text-red-500']" 
                />
                <span :class="[isIncrease ? 'text-green-600' : 'text-red-600', 'font-medium']">
                    {{ percentageChange }}%
                </span>
            </div>
        </div>

        <div :class="`grid place-items-center w-11 h-11 rounded-lg ${iconBgColor}`">
            <UIcon :name="iconName" :class="['size-6', iconColor]" />
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Number],
        required: true,
    },
    /**
     * The percentage change to display. Provide a positive number.
     * The direction (increase/decrease) is controlled by the `changeType` prop.
     */
    percentageChange: {
        type: Number,
        required: true,
    },
    /**
     * Determines if the change is an increase or a decrease.
     * Accepts 'increase' or 'decrease'.
     */
    changeType: {
        type: String,
        required: true,
        validator: (value: string) => ['increase', 'decrease'].includes(value),
    },
    /**
     * The name of the icon to display (e.g., 'i-heroicons-document-duplicate')
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
     * The Tailwind CSS class for the icon's background color (e.g., 'bg-blue-100')
     */
    iconBgColor: {
        type: String,
        default: 'bg-gray-100',
    }
});

const isIncrease = computed(() => props.changeType === 'increase');

</script>