<template>
    <UCard :ui="uiCardConfig">
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <p class="font-medium text-gray-900 dark:text-gray-100">{{ title }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ subtitle }}</p>
            </div>
            <div class="flex items-center gap-3">
                <UBadge :label="budgetType" :color="typeColor" variant="soft" class="rounded-full" />
                <p class="font-semibold text-gray-900 dark:text-gray-100">₱{{ formattedAmount }}</p>
            </div>
        </div>
    </UCard>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    budgetType: {
        type: String,
        required: true,
    },
    typeColor: {
        type: String,
        required: true,
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