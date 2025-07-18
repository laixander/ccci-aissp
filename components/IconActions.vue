<template>
    <div class="flex gap-2">
        <!-- Predefined Icon Buttons with Tooltip -->
        <template v-for="icon in icons" :key="icon">
            <UTooltip :text="iconMap[icon]?.tooltip">
                <UButton :icon="iconMap[icon].icon" :color="iconMap[icon].color" variant="ghost" size="sm"
                    @click="handleClick(icon)" />
            </UTooltip>
        </template>

        <!-- Custom Buttons via Slot -->
        <slot />

        <!-- Delete Confirmation Modal -->
        <UModal v-model:open="showDeleteModal" :ui="confirmUI">
            <template #content>
                <div class="font-semibold text-default">
                    Confirm Deletion
                </div>
                <div class="space-y-1">
                    <div class="text-toned">
                        Are you sure you want to delete this item?
                    </div>
                    <div class="text-sm text-dimmed">
                        This action cannot be undone.
                    </div>
                </div>
                <div class="flex justify-end gap-2">
                    <UButton label="Cancel" color="neutral" variant="ghost" size="lg" @click="showDeleteModal = false" />
                    <UButton label="Delete" color="error" icon="i-lucide-trash-2" size="lg" @click="confirmDelete" />
                </div>
            </template>
        </UModal>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    icons: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['view', 'copy', 'download', 'edit', 'delete-confirmed'])

const showDeleteModal = ref(false)

const iconMap = {
    view: { icon: 'i-lucide-eye', tooltip: 'View', color: 'neutral' },
    copy: { icon: 'i-lucide-copy', tooltip: 'Copy', color: 'neutral' },
    download: { icon: 'i-lucide-download', tooltip: 'Download', color: 'neutral' },
    edit: { icon: 'i-lucide-edit', tooltip: 'Edit', color: 'neutral' },
    delete: { icon: 'i-lucide-trash-2', tooltip: 'Delete', color: 'error' }
}

function handleClick(action) {
    if (action === 'delete') {
        showDeleteModal.value = true
    } else {
        emit(action)
    }
}

function confirmDelete() {
    showDeleteModal.value = false
    emit('delete-confirmed')
}

const confirmUI = {
    content: 'divide-none p-4 lg:p-6 space-y-4'
}
</script>