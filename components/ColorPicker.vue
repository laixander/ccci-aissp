<template>
    <div>
        <UFormField v-if="label" :label="label">
            <div class="flex items-center gap-2">
                <UPopover :content="{ align: 'start', side: 'bottom' }">
                    <div class="shrink-0 w-9 h-9 rounded-md" :style="{ backgroundColor: modelValue }" />
                    <template #content>
                        <UColorPicker v-model="internalValue" class="p-2" @update:modelValue="updateValue" />
                    </template>
                </UPopover>
                <UInput v-model="internalValue" size="lg" class="w-full" @update:modelValue="updateValue" />
            </div>
        </UFormField>

        <div v-else class="flex items-center gap-2">
            <UPopover :content="{ align: 'start', side: 'bottom' }">
                <div class="shrink-0 w-9 h-9 rounded-md" :style="{ backgroundColor: modelValue }" />
                <template #content>
                    <UColorPicker v-model="internalValue" class="p-2" @update:modelValue="updateValue" />
                </template>
            </UPopover>
            <UInput v-model="internalValue" size="lg" class="w-full" @update:modelValue="updateValue" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    label?: string
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | undefined): void
}>()

const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
    internalValue.value = newVal
})

function updateValue(value: string | undefined) {
    emit('update:modelValue', value)
}
</script>
