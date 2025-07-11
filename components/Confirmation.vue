<template>
    <UModal :dismissible="false" :ui="uiModalConfig">
        <slot name="action">
            <UButton :label="actionLabel" :color="actionColor" size="sm" />
        </slot>
        <template #header>
            <div :class="[
                'text-xl rounded-lg w-10 h-10 flex items-center justify-center',
                props.type === 'delete'
                    ? 'text-red-600 dark:text-red-800 bg-red-50 dark:bg-red-900/10'
                    : 'text-yellow-600 dark:text-yellow-800 bg-yellow-50 dark:bg-yellow-900/10'
            ]">
                <UIcon :name="iconName" />
            </div>
        </template>
        <template #body>
            <div class="space-y-1.5 mb-12">
                <slot name="message">
                    <p class="text-gray-800 dark:text-gray-100 font-medium">Are you sure you want to {{
                        actionLabel.toLowerCase() }} this item?</p>
                </slot>
                <template v-if="$slots.hint">
                    <slot name="hint" />
                </template>
                <template v-else-if="!hideHint">
                    <p class="text-gray-600 dark:text-gray-400 text-xs">
                        {{ props.type === 'edit' ? 'Your changes will be applied immediately.' : 'This action cannot be undone.' }}
                    </p>
                </template>
            </div>
        </template>
        <template #footer="{ close }">
            <UButton label="Cancel" color="neutral" size="lg" variant="ghost" @click="close" />
            <UButton :label="actionLabel" :color="actionColor" size="lg" variant="solid" @click="$emit(emitEvent)" />
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
const emit = defineEmits(['delete', 'edit'])

const props = defineProps({
    type: {
        type: String as PropType<'delete' | 'edit'>,
        default: 'delete',
    },
    hideHint: {
        type: Boolean,
        default: false
    },
    actionLabel: String,
})

const actionLabel = computed(() => props.actionLabel || (props.type === 'delete' ? 'Delete' : 'Edit'))
const actionColor = computed(() => props.type === 'delete' ? 'error' : 'warning')
const iconName = computed(() => props.type === 'delete' ? 'i-lucide-trash' : 'i-lucide-pencil')
const emitEvent = computed(() => props.type)

const uiModalConfig = {
    content: 'divide-none',
    header: 'py-6',
    body: 'py-0 sm:py-0',
    footer: 'justify-end pt-0 pb-6'
}
</script>