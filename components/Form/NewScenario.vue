<template>
    <UModal 
    v-model:open="open"
    title="Create New Budget Scenario" 
    description="Define a new budget allocation scenario for comparison"
    :ui="uiModalConfig">
        <UButton 
            label="New Scenario"
            icon="i-lucide-plus" size="lg"
            class="w-full md:w-auto justify-center" />
        <template #body>
            <div class="space-y-4">
                <UFormField label="Scenario Name" size="lg">
                    <UInput placeholder="e.g., Standard Implementation" class="w-full" />
                </UFormField>
                <UFormField label="Description" size="lg">
                    <UTextarea :rows="4" placeholder="Brief description of this scenario..." class="w-full" />
                </UFormField>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField label="Total Budget (PHP)" size="lg">
                        <UInputNumber
                            v-model="totalBudget"
                            :format-options="{
                                style: 'currency',
                                currency: 'PHP',
                                currencyDisplay: 'code',
                                currencySign: 'accounting'
                            }"
                            class="w-full"
                            :default-value="0"
                        />
                    </UFormField>
                    <UFormField label="Number of Entities" size="lg">
                        <USelect v-model="entityValue" :items="entity" class="w-full" />
                    </UFormField>
                    <UFormField label="MOOE Allocation (PHP)" size="lg">
                        <UInputNumber
                            v-model="mooeAllocation"
                            :format-options="{
                                style: 'currency',
                                currency: 'PHP',
                                currencyDisplay: 'code',
                                currencySign: 'accounting'
                            }"
                            class="w-full"
                            :default-value="0"
                        />
                    </UFormField>
                    <UFormField label="CO Allocation (PHP)" size="lg">
                        <UInputNumber
                            v-model="coAllocation"
                            :format-options="{
                                style: 'currency',
                                currency: 'PHP',
                                currencyDisplay: 'code',
                                currencySign: 'accounting'
                            }"
                            class="w-full"
                            :default-value="0"
                        />
                    </UFormField>
                </div>
                <UFormField label="Initial Status" size="lg">
                    <USelect v-model="statusValue" :items="status" class="w-full" />
                </UFormField>

                <UAlert
                    color="secondary"
                    variant="subtle"
                >
                    <template #title>
                        Budget Validation
                    </template>
                    <template #description>
                        MOOE + CO should equal Total Budget: {{ formatCurrency(totalBudget) }}
                        <br>
                        Total Allocation: {{ formatCurrency(totalAllocated) }}
                        <p v-if="totalAllocated > totalBudget" class="text-sm text-red-600 mt-1">⚠️ Budget allocations don't match total budget (over budget)</p>
                    </template>
                </UAlert>

                <div class="flex gap-2 w-full justify-end">
                    <UButton label="Cancel" color="neutral" size="lg" variant="outline" @click="open = false" />
                    <UButton label="Create Scenario" size="lg" :disabled="!isBudgetValid" />
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const uiModalConfig = {
    content: 'divide-y-0 max-w-2xl',
    header: 'sm:p-6 space-y-1.5 items-center',
    body: 'pt-0 sm:pt-0',
    title: 'text-2xl font-semibold leading-none',
}

// Modal State
const open = ref(false)

// Status Select
const status = ref(['Draft', 'Under Review', 'Active']);
const statusValue = ref('Draft');

// Entity Select
const entity = ref(['1 Entity', '2 Entities', '4 Entities', '8 Entities', '16 Entities']);
const entityValue = ref(entity.value[0]);

// Budget Fields
const totalBudget = ref(0);
const mooeAllocation = ref(0);
const coAllocation = ref(0);

// Computed property for total allocated budget, handling potential null/undefined inputs
const totalAllocated = computed(() => {
    const mooe = mooeAllocation.value ?? 0; // Use nullish coalescing operator
    const co = coAllocation.value ?? 0;     // Use nullish coalescing operator
    return mooe + co;
});

// Computed property for budget validation (exact match for button enablement), handling potential null/undefined inputs
const isBudgetValid = computed(() => {
    const totalB = totalBudget.value ?? 0; // Use nullish coalescing operator
    return totalAllocated.value === totalB;
});

// Helper function to format currency for display in the alert, handling potential null/undefined inputs
const formatCurrency = (value: number | null | undefined) => {
    const numValue = value ?? 0; // Treat null/undefined as 0 for formatting
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        currencyDisplay: 'symbol' // Use 'symbol' for '₱'
    }).format(numValue);
};
</script>