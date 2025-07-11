<template>
    <USelectMenu 
        v-model="model" 
        :items="organizations" 
        placeholder="Select Organization" 
        class="w-full"
        :multiple="multiple">
    </USelectMenu>
</template>

<script setup lang="ts">
defineProps({
    multiple:{type:Boolean, default: false}
})
const model = defineModel<string>()
const organizations = [
    'IT Department', 'Human Resources', 'Finance Department', 'Research and Development'
]
</script>