<template>
    <UCard :ui="uiCardConfig" class="hover:shadow-md">
        <div class="flex items-center justify-between">
            <div>
                <div class="flex items-center gap-2">
                    <p class="font-medium text-gray-900 dark:text-gray-100">{{ host }}:{{port}}</p> 
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Database name: {{ name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Database schema: {{ schema }}</p>
            </div>
            <div class="flex items-center gap-3">
                <USwitch  :model-value="isActive" size="lg" label="Active" :default-value="isActive" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">

defineProps({
  host: { type: String, default:''},
  port: { type: String, default:'' },
  name: { type: String, default:''},
  schema: { type: String, default:'' },
  isActive: { type: Boolean, default: true }
})


const uiCardConfig = {
    body: 'sm:p-4'
}
</script>