<template>
    <USelectMenu 
        v-model="model" 
        :items="types" 
        placeholder="Select Organization" 
        class="w-full" 
        :multiple="multiple"/>
</template>

<script setup lang="ts">
defineProps({
    multiple:{type:Boolean, default: false}
})
const model = defineModel<string>()
const types = [
    'CAMPUS', 'COLLEGE', 'COURSE', 'DEPARTMENT', 
]
</script>