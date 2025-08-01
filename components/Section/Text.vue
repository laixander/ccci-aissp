<template>
    <div class="p-4 space-y-4 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between">
            <span class="font-semibold text-lg">Save Text</span>
            <UButton icon="i-lucide-plus" label="New Text" color="neutral" size="sm" @click="toggleForm" />
        </div>

        <div v-if="showForm" class="space-y-4">
            <form @submit.prevent="saveText" class="space-y-4">
                <UFormField label="Text Code">
                    <UInput v-model="newText.code" placeholder="Enter text code..." size="lg" class="w-full" />
                </UFormField>

                <UFormField label="Text Value">
                    <UTextarea v-model="newText.value" :rows="4" placeholder="Enter the value of the code..." size="lg"
                        class="w-full" />
                </UFormField>

                <UButton type="submit" label="Save Text" size="lg" block :loading="isSaving" />
            </form>
        </div>
    </div>

    <div class="overflow-y-auto p-4">
        <div class="grid lg:grid-cols-2 gap-4">
            <!-- Skeleton for pending item -->
            <template v-if="pendingItem">
                <UCard :ui="uiCardConfig">
                    <div class="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    <div class="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse mt-2"></div>
                </UCard>
            </template>

            <!-- List of saved texts -->
            <UCard v-for="(text, index) in savedTexts" :key="index" :ui="uiCardConfig">
                <UBadge :label="text.code" variant="soft" class="rounded-full" />
                <div class="text-sm text-muted truncate w-full">{{ text.value }}</div>
            </UCard>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)
const isSaving = ref(false)
const pendingItem = ref(false)

const toggleForm = () => {
    showForm.value = !showForm.value
}

const newText = ref({
    code: '',
    value: ''
})

const savedTexts = ref([
    { code: 'Text_03', value: 'Hello World!' },
    { code: 'Text_02', value: 'Lorem ipsum dolor sit amet.' },
    { code: 'Text_01', value: 'The quick brown fox jumps over the lazy dog' }
])

const saveText = async () => {
    const { code, value } = newText.value

    if (!code.trim() || !value.trim()) return

    isSaving.value = true
    pendingItem.value = true

    // Store values before clearing
    const itemToAdd = { code, value }

    // Clear form early for UX
    newText.value.code = ''
    newText.value.value = ''
    showForm.value = false

    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Add new item at the top
    savedTexts.value.unshift(itemToAdd)

    isSaving.value = false
    pendingItem.value = false
}

const uiCardConfig = {
    body: 'sm:p-4 flex flex-col items-start gap-2'
}
</script>