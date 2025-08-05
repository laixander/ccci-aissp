<template>
    <UCard>
        <UStepper v-model="currentStep" :items="items" class="w-full">
            <template #info>
                <UCard variant="soft" class="my-4">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Step 1: Document Info
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Provide the basic details about your ISSP document including agency, timeframe, and document
                        reference.
                    </p>
                    <div class="grid lg:grid-cols-2 gap-4 mt-4">
                        <UFormField label="Title" required size="lg">
                            <UInput placeholder="e.g. ISSP Document" class="w-full" />
                        </UFormField>

                        <UFormField label="Entity" required size="lg">
                            <UInput placeholder="e.g. ICTC" class="w-full" />
                        </UFormField>

                        <UFormField label="Description" required size="lg" class="lg:col-span-2">
                            <UTextarea placeholder="e.g. ISSP Description" class="w-full" />
                        </UFormField>
                    </div>
                </UCard>
            </template>

            <template #budget>
                <UCard variant="soft" class="my-4">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Step 2: Budget Scenario
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Select the budget scenario that best fits your agency’s current planning cycle.
                    </p>
                    <div class="space-y-4 mt-4">
                        <CardBudget 
                            v-for="item in CardBudgets" 
                            v-bind="item"
                            :key="item.title" 
                            :status="(item.status as 'Active' | 'Draft' | 'Under Review')" 
                            :asCheckbox="true"
                            :checked="selectedScenario?.title === item.title"
                            :class="{ 'ring-2 ring-primary' : selectedScenario?.title === item.title }"
                            @click="selectedScenario = item"
                        />
                    </div>
                </UCard>
            </template>

            <template #systems>
                <UCard variant="soft" class="my-4">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Step 3: Systems Inventory
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        List existing and proposed systems relevant to your ISSP submission.
                    </p>
                    <div class="space-y-4 mt-4">
                        <CardSystem
                            v-for="(item, index) in systems"
                            :key="index"
                            v-bind="item"
                            :asCheckbox="true"
                            :checked="selectedSystems.includes(item)"
                            :class="{ 'ring-2 ring-primary' : selectedSystems.includes(item) }"
                            @click="toggleSystem(item)"
                        />
                    </div>
                </UCard>

                <!-- if equal or underspending, show this alert box -->
                <UAlert
                  v-if="!isOverBudget && selectedScenario"
                  icon="i-lucide-check-check"
                  variant="soft"
                  color="success"
                  description="The total MOOE and CO for the selected systems are within your agency’s available budget. No overspending detected."
                />

                <!-- if overspending, show this alert box -->
                <UAlert
                  v-if="isOverBudget && selectedScenario"
                  icon="i-lucide-triangle-alert"
                  variant="soft"
                  color="warning"
                  description="Alert: The combined MOOE and CO requirements of the selected systems exceed the allocated budget. Please reassess your selections or adjust your financial plan."
                />
            </template>

            <template #needs>
                <UCard variant="soft" class="my-4">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Step 4: IT Requirements
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Outline your agency’s IT needs such as hardware, software, and services for the covered period.
                    </p>
                    <div class="space-y-4 mt-4">
                        <CardTopRequest
                            v-for="item in requests"
                            :key="item.request"
                            v-bind="item"
                            :asCheckbox="true"
                            :checked="selectedRequests.includes(item)"
                            :class="{ 'ring-2 ring-primary': selectedRequests.includes(item) }"
                            @click="toggleRequest(item)"
                        />
                    </div>
                </UCard>
            </template>

            <template #template>
                <UCard variant="soft" class="my-4">
                    <div class="flex justify-between items-start gap-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Step 5: Select Template
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                Choose a document template that matches your submission format and preferred layout.
                            </p>
                        </div>
                        <USelect v-model="selectedTemplate" :items="templates" placeholder="Select Template" size="lg" class="lg:w-48" />
                    </div>
                    <div class="space-y-4 mt-4">
                        <!-- empty state -->
                        <EmptyState
                          :show="!selectedTemplate"
                          icon="i-lucide-inbox"
                          title="No template selected."
                          description="Please choose a template to continue."
                        />
                        <!-- show selected template -->
                        <!-- <div v-if="selectedTemplate" class="border border-gray-200 dark:border-gray-700 rounded p-4">
                          <p class="text-sm text-muted mb-1">Selected Template:</p>
                          <p class="font-medium text-primary">{{ selectedTemplate }}</p>
                        </div> -->
                        <!-- selected section -->
                        <draggable v-if="selectedTemplate" v-model="sections" item-key="id" class="space-y-4" :animation="200" ghost-class="drag-ghost"
                            chosen-class="drag-chosen">
                            <template #item="{ element: section }">
                                <CardSection :title="section.title" :description="section.description" :type="section.type" @edit="onEdit(section)" @delete="onDelete(section)" :asTemplate="true" />
                            </template>
                        </draggable>
                    </div>
                </UCard>
            </template>
        </UStepper>
        <div class="flex justify-between mt-6">
            <UButton v-if="currentStep > 0" @click="prevStep" label="Previous" color="neutral" variant="outline" icon="i-lucide-arrow-left" />
            <div class="ml-auto">
                <UButton v-if="currentStep < items.length - 1" @click="nextStep" label="Next" color="neutral" size="lg" trailing-icon="i-lucide-arrow-right" />
                <UButton v-else @click="submit" label="Proceed" size="lg" trailing-icon="i-lucide-arrow-right" />
            </div>
        </div>
    </UCard>
</template>
<script setup lang="ts">
import { CardTopRequest, UTextarea } from '#components'
import type { StepperItem } from '@nuxt/ui'
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'

const templates = ref(['ISSP Template 2024', 'ISSP Template 2025', 'ISSP Template Dratf', 'ISSP Template 2024 v2'])

type Section = {
    id: number
    title: string
    description: string
    type: string
}

const items = [
    {
        slot: 'info' as const,
        title: 'Document Information',
        description: 'Basic project details',
        icon: 'i-lucide-file-text'
    },
    {
        slot: 'budget' as const,
        title: 'Budget Scenario',
        description: 'Funding breakdown',
        icon: 'i-lucide-philippine-peso'
    },
    {
        slot: 'systems' as const,
        title: 'Systems',
        description: 'System details',
        icon: 'i-lucide-server'
    },
    {
        slot: 'needs' as const,
        title: 'IT Needs',
        description: 'Technology requirements',
        icon: 'i-lucide-chart-no-axes-combined'
    },
    {
        slot: 'template' as const,
        title: 'Template',
        description: 'Select a template',
        icon: 'i-lucide-panels-top-left'
    },
] satisfies StepperItem[]

const currentStep = ref(0)

const nextStep = () => {
    if (currentStep.value < items.length - 1) {
        currentStep.value++
    }
}

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--
    }
}

const submit = () => {
    // Add your submit logic here
    alert('Form submitted!')
}



// Sample data
const CardBudgets = [
    {
        title: 'Standard Implementation',
        status: 'Active',
        totalBudget: 15000000,
        mooe: 8500000,
        co: 6500000
    },
    {
        title: 'Accelerated Rollout',
        status: 'Active',
        totalBudget: 22000000,
        mooe: 12000000,
        co: 10000000
    },
    {
        title: 'Phased Approach',
        status: 'Active',
        totalBudget: 18500000,
        mooe: 10200000,
        co: 8300000
    },
]

const selectedScenario = ref<typeof CardBudgets[0] | null>(null)

const systems = ref([
    {
        system: "Student Information System",
        entity: "Registrar Office",
        budget: "₱8,500,000",
        priority: "high",
        status: "active",
        deadline: "Dec 15, 2024"
    },
    {
        system: "Learning Management System",
        entity: "Academic Affairs",
        budget: "₱7,800,000",
        priority: "high",
        status: "inprogress",
        deadline: "Jan 10, 2025"
    },
    {
        system: "Financial Management System",
        entity: "Finance Office",
        budget: "₱3,200,000",
        priority: "medium",
        status: "planning",
        deadline: "Feb 20, 2025"
    },
    {
        system: "Human Resource Information System",
        entity: "HR Department",
        budget: "₱2,100,000",
        priority: "medium",
        status: "active",
        deadline: "Mar 15, 2025"
    },
    {
        system: "Library Management System",
        entity: "University Library",
        budget: "₱800,000",
        priority: "low",
        status: "completed",
        deadline: "Apr 25, 2025"
    }
])

const selectedSystems = ref<typeof systems.value>([])

const toggleSystem = (item: typeof systems.value[0]) => {
    const index = selectedSystems.value.indexOf(item)
    if (index === -1) {
        selectedSystems.value.push(item)
    } else {
        selectedSystems.value.splice(index, 1)
    }
}

const totalSelectedSystemBudget = computed(() => {
  return selectedSystems.value.reduce((total, system) => {
    const numericBudget = Number(system.budget.replace(/[^0-9.-]+/g, ''))
    return total + (isNaN(numericBudget) ? 0 : numericBudget)
  }, 0)
})

const isOverBudget = computed(() => {
  return selectedScenario.value
    ? totalSelectedSystemBudget.value > selectedScenario.value.totalBudget
    : false
})

const requests = [
    {
        request: 'Laptop Upgrades',
        count: 30,
        budget: 3000000,
        trend: +12,
        priority: 'High'
    },
    {
        request: 'Wi-Fi Expansion',
        count: 12,
        budget: 1500000,
        trend: +18,
        priority: 'High'
    },
    {
        request: 'Email System Migration',
        count: 8,
        budget: 1000000,
        trend: +7,
        priority: 'Medium'
    },
    {
        request: 'Cloud Backup Services',
        count: 5,
        budget: 500000,
        trend: -4,
        priority: 'Medium'
    },
    {
        request: 'Printers and Scanners',
        count: 10,
        budget: 300000,
        trend: +2,
        priority: 'Low'
    }
]

const selectedRequests = ref<typeof requests>([])

const toggleRequest = (item: typeof requests[0]) => {
  const index = selectedRequests.value.indexOf(item)
  if (index === -1) {
    selectedRequests.value.push(item)
  } else {
    selectedRequests.value.splice(index, 1)
  }
}

const sections = ref<Section[]>([
    {
        id: 1,
        title: 'Table of Contents',
        description: 'Define the structure and content of the document.',
        type: 'text_content'
    },
    {
        id: 2,
        title: 'MSU Marawi Campus - Organisational Chart',
        description: 'Upload the organizational chart image for MSU Marawi Campus.',
        type: 'image_upload'
    },
    {
        id: 3,
        title: 'Strategic Concerns for ICT Use',
        description: 'Mapping database fields for strategic concerns.',
        type: 'db_mapping'
    },
    {
        id: 4,
        title: 'Strategic Concerns for ICT Use',
        description: 'Map API endpoints for strategic concerns.',
        type: 'api_mapping'
    },
    {
        id: 5,
        title: 'Functional Description',
        description: 'Generated functional description for org chart using AI prompts.',
        type: 'ai_prompt'
    },
    {
        id: 6,
        title: 'Internal Mapping',
        description: 'Configure internal data relationships and linkages.',
        type: 'internal_mapping'
    }
])
const selectedTemplate = ref<string | null>(null)
</script>
<style scoped>
.drag-ghost {
    @apply opacity-0;
}
</style>