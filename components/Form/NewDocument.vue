<template>
    <div class="space-y-4">
        <UFormField label="ISSP Title" size="lg" required>
            <UInput placeholder="e.g., College of Engineering ISSP 2025-2028" class="w-full" />
        </UFormField>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Entity/Department" size="lg" required>
                <USelect :items="entity" placeholder="Select entity" class="w-full" />
            </UFormField>
            <UFormField label="Planning Period" size="lg" required>
                <UInput placeholder="e.g., 2025-2028" class="w-full" />
            </UFormField>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Primary Author" size="lg" required>
                <UInput placeholder="e.g., Dr. Maria Santos" class="w-full" />
            </UFormField>
            <UFormField label="Department/Unit" size="lg">
                <UInput placeholder="Specific department or unit" class="w-full" />
            </UFormField>
        </div>
        <UFormField label="Description" size="lg">
            <UTextarea :rows="4" placeholder="Brief description of the strategic plan scope and objectives..." class="w-full" />
        </UFormField>

        <UFormField label="Template" size="lg">
            <USelect v-model="templateValue" :items="template" class="w-full" />
        </UFormField>

        <UFormField label="Initial Status" size="lg">
            <USelect v-model="statusValue" :items="status" class="w-full" />
        </UFormField>

        <UAlert
            color="secondary"
            variant="subtle"
            title="Getting Started"
            description="After creating your ISSP document, you'll be able to add sections, upload supporting documents, and collaborate with reviewers. The document will start in Draft status and can be submitted for review when ready."
            :ui="{title: 'text-lg text-secondary-600'}"
        />

        <div class="flex gap-2 w-full justify-end">
            <UButton color="neutral" label="Cancel" size="lg" variant="outline" />
            <UButton color="primary" label="Create ISSP" size="lg" disabled />
        </div>
    </div>
</template>

<script setup lang="ts">
const entity = ref(['College of Arts & Sciences', 'Graduate School', 'Research Division', 'IT Services', 'Library System', 'Business Office'])

const status = ref(['Draft', 'In Review'])
const statusValue = ref('Draft')

const template = ref([
    'Default ISSP Template',
    'Research Strategic Plan',
    'IT Strategic Roadmap',
    'Library Development Plan',
    'Graduate Program Expansion',
    'Business Office Operations'
])
const templateValue = ref('Default ISSP Template')
</script>