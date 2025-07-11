<template>
  <div class="flex items-center gap-3 mb-4">
    <UIcon :name="iconName" class="size-6 text-gray-500 flex-shrink-0" />
    <div>
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
      <p class="text-sm text-gray-500">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  iconName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>