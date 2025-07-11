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
                    <!-- Custom File Input Field -->
                    <label v-if="!selectedFiles.length"
                        class="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition"
                        tabindex="0">
                        <input type="file" multiple class="hidden" @change="handleFiles" ref="fileInput"
                            accept=".pdf,.png,.jpg,.jpeg" />
                        <UIcon name="i-lucide-upload" class="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                        <p class="text-sm text-gray-600">Drag and drop files here, or click to browse</p>
                        <p class="text-xs text-gray-500 mt-1">Support for images, diagrams, specifications (PDF, PNG, JPG)</p>
                    </label>

                    <!-- Show selected files with remove option -->
                    <div v-else class="mt-3 text-center">
                        <p class="text-xs font-semibold mb-2 text-gray-700">Selected files:</p>
                        <ul class="text-xs text-gray-600 space-y-1">
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