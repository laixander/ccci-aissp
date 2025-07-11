<template>
    <Page page-title="Budget Planning & Scenarios"
        page-description="Create and manage budget scenarios with MOOE/CO classifications">
        <template #actions>
            <UButton 
                icon="i-lucide-upload" size="lg" color="neutral" variant="outline"
                class="w-full md:w-auto justify-center">Import CSV</UButton>

            <FormNewScenario />
        </template>
        <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardStat v-for="stat in cardStats" :key="stat.label" v-bind="stat" />
            </div>
            <Block title="Budget Scenarios" description="Compare different budget allocation strategies">
                <template #content>
                    <div class="space-y-4">
                        <CardBudget v-for="scenario in CardBudgets" :key="scenario.title" v-bind="scenario"
                            @edit="handleEdit(scenario.title)" @download="handleDownload(scenario.title)"
                            @delete="handleDelete(scenario.title)" />
                    </div>
                </template>
            </Block>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Block title="Budget Breakdown" description="Detailed allocation with auto-tagging">
                    <template #content>
                        <div class="space-y-4">
                            <CardBreakdown
                                v-for="breakdown in CardBreakdowns"
                                :key="breakdown.id"
                                v-bind="breakdown"
                            />
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600 dark:text-gray-400">MOOE Total:</span>
                                <span class="font-semibold text-purple-700 dark:text-purple-400">₱2,650,000</span>
                            </div>
                            <div class="flex justify-between text-sm mt-1">
                                <span class="text-gray-600 dark:text-gray-400">CO Total:</span>
                                <span class="font-semibold text-orange-700 dark:text-orange-400">₱7,650,000</span>
                            </div>
                        </div>
                    </template>
                </Block>
                <Block title="Data Management" description="Import and export budget data">
                    <template #content>
                        <div class="space-y-6">
                            <UFormField label="Import Budget Data (CSV)" size="lg">
                                <label v-if="!selectedFiles.length"
                                    class="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition dark:border-gray-600 dark:hover:border-primary-400"
                                    tabindex="0">
                                    <input type="file" multiple class="hidden" @change="handleFiles" ref="fileInput"
                                        accept=".pdf,.png,.jpg,.jpeg" />
                                    <UIcon name="i-lucide-upload" class="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Drop CSV file here or click to browse</p>
                                    <p class="text-xs text-gray-500 mt-1 dark:text-gray-500">Format: Item, Category, Amount, Entity</p>
                                </label>

                                <div v-else class="mt-3 text-center">
                                    <p class="text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">Selected files:</p>
                                    <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                        <li v-for="(file, idx) in selectedFiles" :key="file.name"
                                            class="flex items-center justify-center gap-2">
                                            {{ file.name }}
                                            <UButton icon="i-lucide-trash" size="xs" color="error" variant="ghost" @click="removeFile(idx)"
                                                aria-label="Remove file" />
                                        </li>
                                    </ul>
                                    <UButton class="mt-2" color="primary" variant="outline" size="lg" @click="fileInput?.click()">
                                        Add More Files
                                    </UButton>
                                </div>
                            </UFormField>
                            <UFormField label="Export Options" size="lg" :ui="{ container: 'space-y-2' }">
                                <UButton label="Export as Excel (.xlsx)" icon="i-lucide-file-spreadsheet" color="neutral" variant="outline" size="lg" class="w-full" />
                                <UButton label="Export as CSV" icon="i-lucide-download" color="neutral" variant="outline" size="lg" class="w-full" />
                                <UButton label="Generate Budget Summary" icon="i-lucide-calculator" color="neutral" variant="outline" size="lg" class="w-full" />
                            </UFormField>
                            <UAlert
                                color="warning"
                                variant="subtle"
                                title="Auto-Classification"
                                description="System automatically tags items as MOOE (operational expenses) or CO (capital outlay) based on predefined rules."
                            />
                        </div>
                    </template>
                </Block>
            </div>
        </template>
    </Page>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'dashboard',
    auth: false
})

const cardStats = [
    {
        icon: 'i-lucide-calculator',
        iconColor: 'text-cyan-500 dark:text-cyan-400',
        label: 'Total Budget',
        value: '₱18,500,000'
    },
    {
        icon: 'i-lucide-chart-pie',
        iconColor: 'text-violet-500 dark:text-violet-400',
        label: 'MOOE Allocation',
        value: '₱10,233,333.33'
    },
    {
        icon: 'i-lucide-trending-up',
        iconColor: 'text-orange-500 dark:text-orange-400',
        label: 'CO Allocation',
        value: '₱8,266,666.67'
    },
    {
        icon: 'i-lucide-file-spreadsheet',
        iconColor: 'text-green-500 dark:text-green-400',
        label: 'Active Scenarios',
        value: '23'
    }
]

const CardBudgets = [
    {
        title: 'Standard Implementation',
        status: 'Active',
        totalBudget: 15000000,
        mooe: 8500000,
        co: 6500000,
        lastModified: '2024-12-01',
    },
    {
        title: 'Accelerated Rollout',
        status: 'Draft',
        totalBudget: 22000000,
        mooe: 12000000,
        co: 10000000,
        lastModified: '2024-11-28',
    },
    {
        title: 'Phased Approach',
        status: 'Under Review',
        totalBudget: 18500000,
        mooe: 10200000,
        co: 8300000,
        lastModified: '2024-11-25',
    },
]

const handleEdit = (title: string) => {
    console.log('Edit clicked')
}
const handleDownload = (title: string) => {
    console.log('Download clicked')
}
const handleDelete = (title: string) => {
    console.log('Delete clicked')
}

const CardBreakdowns = ref([
{
    id: 1,
    title: 'Student Information System',
    subtitle: 'Registrar',
    tagText: 'CO',
    tagColorClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', // Updated to full Tailwind class
    amount: 2500000,
  },
  {
    id: 2,
    title: 'Network Infrastructure',
    subtitle: 'IT Services',
    tagText: 'CO',
    tagColorClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', // Updated to full Tailwind class
    amount: 3200000,
  },
  {
    id: 3,
    title: 'Software Licenses',
    subtitle: 'All Entities',
    tagText: 'MOOE',
    tagColorClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300', // Updated to full Tailwind class
    amount: 1800000,
  },
  {
    id: 4,
    title: 'Training Programs',
    subtitle: 'HR Department',
    tagText: 'MOOE',
    tagColorClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300', // Updated to full Tailwind class
    amount: 850000,
  },
  {
    id: 5,
    title: 'Security Systems',
    subtitle: 'IT Services',
    tagText: 'CO',
    tagColorClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', // Updated to full Tailwind class
    amount: 1950000,
  },
]);

// File Handling
const selectedFiles = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
function handleFiles(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    selectedFiles.value = Array.from(files)
  }
}
function removeFile(idx: number) {
  selectedFiles.value.splice(idx, 1)
}
</script>