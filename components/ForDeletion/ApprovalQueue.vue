<template>
  <div class="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm">
    
    <CardHeader 
      iconName="i-heroicons-clock"
      title="Approval Queue"
      subtitle="Documents awaiting your review"
    />

    <div class="space-y-3">
      <div 
        v-for="item in queueItems" 
        :key="item.id"
        class="flex justify-between items-center p-4 rounded-lg border border-gray-200/80"
      >
        <div>
          <p class="font-medium text-gray-800">{{ item.title }}</p>
          <div class="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
            <UIcon name="i-heroicons-calendar-days" class="size-4" />
            <span>{{ item.date }}</span>
          </div>
        </div>
        <span :class="['text-xs font-medium px-2.5 py-0.5 rounded-full', getPriorityClasses(item.priority)]">
          {{ item.priority }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const queueItems = ref([
  { id: 1, title: 'College of Arts & Sciences', date: 'Dec 16, 2024', priority: 'high' },
  { id: 2, title: 'Graduate School', date: 'Dec 20, 2024', priority: 'medium' },
  { id: 3, title: 'Research Division', date: 'Jan 5, 2025', priority: 'low' },
]);

const getPriorityClasses = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-gray-800 text-white';
    case 'low':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
</script>