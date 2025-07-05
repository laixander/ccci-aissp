<!-- eslint-disable vue/no-mutating-props -->
<template>
    <UCard :ui="uiCardConfig" class="hover:shadow-md">
        <div class="flex items-center justify-between">
            <div @click="select" class="flex items-center gap-4 w-full">
                <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: colorCode }"></div>
                <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100">{{ name }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Code: {{ code }}</p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <USwitch  :model-value="isActive" size="lg" label="Active" :default-value="isActive" @change="toggle"/>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, default:''},
  code: { type: String, default:'' },
  colorCode: { type: String, default:'' },
  isActive: { type: Boolean, default: true }
})

// const isActive = ref(props.active)
const emit = defineEmits(['toggle', 'select'])

const toggle = ()=>{
    emit('toggle')
}

const select = ()=>{
    emit('select')
}

const uiCardConfig = {
    body: 'sm:p-4'
}
</script>