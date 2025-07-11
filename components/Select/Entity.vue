<template>
    <USelectMenu 
        v-model="model" 
        :items="entities" 
        placeholder="Select Entity" 
        class="w-full">
    </USelectMenu>
</template>

<script setup lang="ts">
defineProps({
    multiple:{type:Boolean, default: false}
})
const model = defineModel<string>()
const entities = [
    'Main Campus', 'North Campus', 'South Campus', 'East Campus'
]
</script>