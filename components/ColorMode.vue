<template>
    <ClientOnly>
        <UButton size="lg" :icon="icon" variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
    </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const colorMode = useColorMode()
const isDark = computed({
    get() {
        console.log('colorMode.value :>> ', colorMode.value);
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})

const icon = computed(() =>{
    return colorMode.value === 'dark'?'i-lucide-moon' : 'i-lucide-sun'
})

</script>