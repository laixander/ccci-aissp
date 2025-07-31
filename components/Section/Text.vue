<template>
    <div class="font-semibold text-lg mb-8 flex items-center justify-between">
        Save Text
        <UButton icon="i-lucide-plus" label="New Text" color="neutral" variant="outline" @click="showForm = !showForm" />
    </div>

    <!-- toggle this form with form -->
    <div v-if="showForm" class="space-y-4 mb-8">
        <UFormField label="Text Code">
            <UInput placeholder="Enter text code..." size="lg" class="w-full" />
        </UFormField>
        <UFormField label="Text Value">
            <UTextarea :rows="4" placeholder="Enter the value of the code..." size="lg" class="w-full" />
        </UFormField>
        <UButton label="Save Text" size="lg" variant="outline" block />
    </div>

    <div class="grid lg:grid-cols-2 gap-4">
        <UCard variant="subtle" :ui="uiCardConfig">
            <UBadge label="Text_03" variant="soft" class="rounded-full" />
            <div class="text-sm text-muted truncate w-full">Hello World!</div>
        </UCard>
        <UCard variant="subtle" :ui="uiCardConfig">
            <UBadge label="Text_02" variant="soft" class="rounded-full" />
            <div class="text-sm text-muted truncate w-full">Lorem ipsum dolor sit amet.</div>
        </UCard>
        <UCard variant="subtle" :ui="uiCardConfig">
            <UBadge label="Text_01" variant="soft" class="rounded-full" />
            <div class="text-sm text-muted truncate w-full">The quick brown fox jumps over the lazy dog</div>
        </UCard>
    </div>


</template>

<script setup>
import { ref } from 'vue'
const showForm = ref(false)

const uiCardConfig = {
    body: 'sm:p-4 flex flex-col items-start gap-2'
}
</script>