<template>
    <UModal v-model:open="open" title="Department IT Needs Form" description="Submit IT requirements for your department" :ui="uiModalConfig">
        <UButton label="Add Request" icon="i-lucide-plus" size="lg" class="w-full lg:w-auto justify-center" />
        <template #body>
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField label="Department" size="lg">
                        <USelect :items="department" placeholder="Select department" class="w-full" />
                    </UFormField>
                    <UFormField label="Priority Level" size="lg">
                        <USelect :items="priority" placeholder="Select priority level" class="w-full" />
                    </UFormField>
                </div>
                <UFormField label="Type" size="lg" name="type">
                    <USelect :items="type"  placeholder="Select request type" class="w-full" />
                </UFormField>
                <UFormField label="Request Title" size="lg">
                    <UInput placeholder="e.g., Upgrade laboratory computers" class="w-full" />
                </UFormField>
                <UFormField label="Description" size="lg">
                    <UTextarea :rows="4" placeholder="Describe your IT needs in detail..." class="w-full" />
                </UFormField>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField label="Quantity Needed" size="lg">
                        <UInputNumber :default-value="0" class="w-full" />
                    </UFormField>
                    <UFormField label="Estimated Budget" size="lg">
                        <UInputNumber :format-options="{
                            style: 'currency',
                            currency: 'PHP',
                            currencyDisplay: 'code',
                            currencySign: 'accounting'
                        }" class="w-full" :default-value="0" />
                    </UFormField>
                </div>
                <UFormField label="Business Justification" size="lg">
                    <UTextarea :rows="4" placeholder="Explain how this IT investment will improve productivity..."
                        class="w-full" />
                </UFormField>

                <UFormField label="Supporting Documents" size="lg">
                    <FileUpload icon="i-lucide-upload"
                                instruction="Upload Supporting Documents for IT Request"
                                :supported-formats="['pdf', 'docx']" :max-file-size-m-b="25" :max-files="2"
                                :multiple="true" button-label="Upload Files" @files-selected="handleSelectedFiles" />
                </UFormField>

                <div class="flex gap-2 w-full justify-end">
                    <UButton label="Cancel" color="neutral" size="lg" variant="outline" @click="open = false" />
                    <UButton label="Submit IT Request" color="primary" size="lg" />
                </div>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
const uiModalConfig = {
    content: 'divide-y-0 max-w-2xl',
    header: 'sm:p-6 space-y-1.5 items-center',
    body: 'pt-0 sm:pt-0',
    title: 'text-2xl font-semibold leading-none',
}

// Modal State
const open = ref(false)

const department = ref(['College of Arts & Sciences', 'Graduate School', 'Research Division', 'IT Services', 'Library System', 'Business Office'])

const priority = ref(['High', 'Medium', 'Low'])

const type = ref(['Hardware', 'Software', 'Training', 'Infrastructure'])

// File Handling
const handleSelectedFiles = (files: File[]) => {
    console.log('Files selected:', files)
}
</script>