<template>
    <UCard :ui="uiCardConfig">
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <p class="font-medium text-gray-900 dark:text-gray-100">{{ title }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ subtitle }}</p>
            </div>
            <div class="flex items-center gap-3">
                <div :class="tagColorClass"
                    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80">
                    {{ tagText }}
                </div>
                <p class="font-semibold text-gray-900 dark:text-gray-100">₱{{ formattedAmount }}</p>
            </div>
        </div>
    </UCard>
</template>

<script setup>
import { defineProps, computed } from 'vue';

// Define the props that this component will accept
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    tagText: {
        type: String,
        required: true,
    },
    tagColorClass: { // Changed prop name to reflect it's a full class string
        type: String, // e.g., 'bg-orange-100 text-orange-800'
        default: 'bg-gray-100 text-gray-800',
    },
    amount: {
        type: Number,
        required: true,
    },
});

// Computed property to format the amount as currency
const formattedAmount = computed(() => {
    return props.amount.toLocaleString('en-PH'); // Formats with Philippine Peso currency style
});

const uiCardConfig = {
    body: 'sm:p-3'
}
</script>