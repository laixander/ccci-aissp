<template>
  <div class="w-full">
    <UStepper ref="stepper" :items="items">
      <template #basic>
        <UCard variant="soft" class="my-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Step 1: Basic Information</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                This step collects basic information about the system.
            </p>
            <div class="space-y-4 mt-4">
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <UFormField label="System Name" size="lg" required class="col-span-3 lg:col-span-4">
                        <UInput class="w-full" placeholder="e.g. Disaster Resilience Informatics Platform" />
                    </UFormField>

                    <UFormField label="System Code / Acronym" size="lg" required class="md:col-span-2 lg:col-span-1">
                        <UInput class="w-full" placeholder="e.g. DRIP" />
                    </UFormField>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <UFormField label="Year Implemented" size="lg" required>
                        <UInput class="w-full" placeholder="e.g. 2025" />
                    </UFormField>

                    <UFormField label="System status" size="lg" required>
                        <USelect :items="status" placeholder="Select status" class="w-full" />
                    </UFormField>

                    <UFormField label="Owner Department/Unit" size="lg" required>
                        <UInput class="w-full" placeholder="e.g. ICTC" />
                    </UFormField>
                </div>
            </div>
        </UCard>
      </template>
      <template #technical>
        <UCard variant="soft" class="my-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Step 2: Technical Details</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                This step collects technical details about the system, including database, storage, and modules.
            </p>
            <div class="space-y-4 mt-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField label="Data Storage" size="lg">
                        <USelect :items="storage" placeholder="Select storage" class="w-full" />
                    </UFormField>
                    <UFormField label="Database Type" size="lg">
                        <UInput placeholder="e.g. RDBMS" class="w-full" />
                    </UFormField>
                </div>
                <UFormField label="Archiving/Storage Media" size="lg">
                    <UTextarea :rows="4" placeholder="e.g. RDBMS + Cloud" class="w-full" />
                </UFormField>
                <UFormField label="Associated Modules" size="lg">
                    <UTextarea :rows="4" placeholder="e.g. Enrollment, Payroll, Billing" class="w-full" />
                </UFormField>
            </div>
        </UCard>
      </template>
      <template #usage>
        <UCard variant="soft" class="my-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Step 3: Usage & Integration</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                This step collects information about users and systems linked to the system.
            </p>
            <div class="space-y-4 mt-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <UFormField label="Internal Users" size="lg" required>
                        <UInput placeholder="e.g. Office of the President, HRDO" class="w-full" />
                    </UFormField>
                    <UFormField label="External Users" size="lg">
                        <UInput placeholder="e.g. MSU Constituents" class="w-full" />
                    </UFormField>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField label="Linked Systems" size="lg">
                        <UInput placeholder="e.g. CMS, Financial System" class="w-full" />
                    </UFormField>
                    <UFormField label="Performance Metrics" size="lg">
                        <UInput placeholder="e.g. SLA %, Uptime %, Client Satisfaction" class="w-full" />
                    </UFormField>
                </div>
            </div>
        </UCard>
      </template>
      <template #security>
        <UCard variant="soft" class="my-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Step 4: Security & Notes</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                This step collects security details and any additional notes about the system.
            </p>
            <div class="space-y-4 mt-4">
                <UFormField label="Security Features" size="lg">
                    <UTextarea :rows="4" placeholder="e.g. MFA, encryption, audit logs" class="w-full" />
                </UFormField>
                <UFormField label="Remarks / Notes" size="lg">
                    <UTextarea :rows="4" placeholder="e.g. Pending approval, upgrade planned for Q4" class="w-full" />
                </UFormField>
            </div>
        </UCard>
      </template>
    </UStepper>

    <div class="flex gap-2 justify-between mt-4">
      <UButton
        leading-icon="i-lucide-arrow-left"
        :disabled="!stepper?.hasPrev"
        @click="stepper?.prev()"
      >
        Prev
      </UButton>

      <!-- <UButton
        trailing-icon="i-lucide-arrow-right"
        :disabled="!stepper?.hasNext"
        @click="stepper?.next()"
      >
        Next
      </UButton> -->
      <UButton
        v-if="stepper?.hasNext"
        trailing-icon="i-lucide-arrow-right"
        @click="stepper?.next()"
      >
        Next
      </UButton>
      <UButton
        v-else
        color="primary"
        trailing-icon="i-lucide-check"
        @click="onSubmit"
      >Submit
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UCard } from '#components'
import type { StepperItem } from '@nuxt/ui'

const items: StepperItem[] = [
  {
    title: 'Basic Info',
    description: 'General details about the system',
    icon: 'i-lucide-info',
    slot: 'basic' as const
  }, 
  {
    title: 'Technical Details',
    description: 'Database, storage, and modules',
    icon: 'i-lucide-cpu',
    slot: 'technical' as const
  }, 
  {
    title: 'Usage & Integration',
    description: 'Users and systems linked',
    icon: 'i-lucide-users',
    slot: 'usage' as const
  }, 
  {
    title: 'Security & Notes',
    description: 'Security and extra information',
    icon: 'i-lucide-shield-check',
    slot: 'security' as const
  }, 
]

const stepper = useTemplateRef('stepper')

const status = ref(['Planned', 'In Progress', 'Operational', 'For Enhancement'])

const storage = ref(['On-premise', 'Cloud', 'Hybrid'])
</script>