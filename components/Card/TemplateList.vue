<template>
  <UCard class="hover:shadow-md transition-shadow">
    <div class="space-y-4">
      <div class="flex items-start justify-between">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <h3 class="font-semibold tracking-tight text-lg text-default">{{ title }}</h3>
            <UBadge
                :label="status"
                :color="status === 'Active' ? 'success' : 'neutral'"
                variant="soft"
                class="rounded-full"
            />
          </div>
          <p class="text-sm text-muted">
            {{ description }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <UButton icon="i-lucide-square-pen" color="neutral" variant="ghost" size="sm" @click="$emit('edit')" />
          <UButton icon="i-lucide-copy" color="neutral" variant="ghost" size="sm" @click="$emit('copy')" />
          <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="sm" @click="$emit('delete')" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-toned">Sections:</span>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="(section, index) in sections"
              :key="index"
              :label="section"
              variant="soft"
              color="neutral"
              class="rounded-full"
            />
          </div>
        </div>
        <UBadge :label="`${sections.length} sections`" variant="outline" color="neutral" class="rounded-full" />
      </div>

      <div class="flex items-center gap-4 text-sm">
        <div class="flex items-center gap-1 text-muted">
          <UIcon name="i-lucide-user" class="w-4 h-4" />
          {{ user }}
        </div>
        <div class="flex items-center gap-1 text-muted">
          <UIcon name="i-lucide-calendar" class="w-4 h-4" />
          Created {{ created }}
        </div>
        <div class="flex items-center gap-1 text-muted">
          <UIcon name="i-lucide-square-pen" class="w-4 h-4" />
          Updated {{ updated }}
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  status: string
  sections: string[]
  user: string
  created: string
  updated: string
}>()

defineEmits(['edit', 'copy', 'delete'])
</script>
