<template>
  <UCard :ui="uiCardConfig">
    <h4 :class="['font-medium mb-2', titleColor]">{{ title }}</h4>
    <p :class="['text-sm mb-3', descriptionColor]">{{ description }}</p>

    <button
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white border h-9 rounded-md px-3"
      :class="[buttonColor]"
      @click="emit('button-click')"
    >
      {{ buttonText }}
    </button>

    <!-- <UButton size="lg" color="neutral" variant="outline" @click="emit('button-click')">
      {{ buttonText }}
    </UButton> -->
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: 'Card Title' },
  description: { type: String, default: 'This is the default content area. Replace with your own content.' },
  buttonText: { type: String, default: 'Card Action' },
  buttonColor: { type: String, default: 'border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 hover:text-purple-800 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700 dark:hover:bg-purple-800 dark:hover:border-purple-500 dark:hover:text-purple-100' },
  titleColor: { type: String, default: 'text-purple-800 dark:text-purple-200' },
  descriptionColor: { type: String, default: 'text-purple-500 dark:text-purple-400' },
  bgColor: { type: String, default: 'bg-purple-50 dark:bg-purple-950/10' },
  borderColor: { type: String, default: 'ring-purple-200 dark:ring-purple-800/50' }
})

const emit = defineEmits(['button-click'])

const uiCardConfig = {
  root: `${props.bgColor} ${props.borderColor}`,
}
</script>