<!-- eslint-disable vue/no-mutating-props -->
<template>
    <UCard :ui="uiCardConfig" class="hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
            <div @click="select" class="w-full">
                <p class="font-medium text-gray-900 dark:text-gray-100">{{ name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
            </div>
            <div class="flex items-center gap-3">
                <USwitch :model-value="isActive" size="lg" label="Active" :default-value="isActive" @change="toggle" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
defineProps({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    type: { type: String, default: '' },
    entity: { type: String, default: '' },
    entityId: { type: Number, default: '' },
    isActive: { type: Boolean, default: true }
})

// const isActive = ref(props.active)
const emit = defineEmits(['toggle', 'select'])

const toggle = () => {
    emit('toggle')
}

const select = () => {
    emit('select')
}

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>