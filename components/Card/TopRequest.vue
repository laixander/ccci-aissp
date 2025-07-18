<template>
  <CardRow hasHover tightSpace>
    <UIcon name="i-lucide-trending-up" class="w-8 h-8 text-purple-600" />

    <DynamicGrid :cols="1" :md-cols="4" class="items-center w-full">
      <div>
        <p class="font-medium text-default">{{ request }}</p>
        <p class="text-sm text-muted">{{ count }} requests</p>
      </div>

      <div class="flex items-center gap-1">
        <UIcon name="i-lucide-dollar-sign" class="w-4 h-4 text-green-600" />
        <div>
          <p class="font-medium text-default">₱{{ budget.toLocaleString('en-PH') }}</p>
          <p class="text-xs text-muted">Budget</p>
        </div>
      </div>

      <div>
        <p
          class="font-medium"
          :class="trend >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'"
        >
          {{ trend > 0 ? `+${trend}%` : `${trend}%` }}
        </p>
        <p class="text-xs text-muted">Trend</p>
      </div>

      <div v-if="priority">
        <UBadge
          :label="priority"
          variant="soft"
          :color="priorityColor"
          class="rounded-full"
        />
      </div>
    </DynamicGrid>

    <IconActions
      :icons="actions"
      @view="$emit('view')"
      @delete-confirmed="$emit('delete-confirmed')"
    />
  </CardRow>
</template>

<script setup lang="ts">
const props = defineProps<{
  request: string
  count: number
  budget: number
  trend: number
  priority?: 'High' | 'Medium' | 'Low'
  actions?: ('view' | 'delete')[]
}>()

defineEmits(['view', 'delete-confirmed'])

const priorityColor = computed(() => {
  switch (props.priority) {
    case 'High':
      return 'error'
    case 'Medium':
      return 'warning'
    case 'Low':
      return 'success'
    default:
      return 'neutral'
  }
})
</script>
