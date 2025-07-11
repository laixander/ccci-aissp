<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex min-h-[100vh]">
        <CoreSidebar/>
        <div class="w-full">
            <CoreHeader/>
            <div class="h-[90vh] overflow-y-auto">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>