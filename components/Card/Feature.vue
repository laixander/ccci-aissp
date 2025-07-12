<template>
    <div :class="['flex items-center gap-3 p-3 rounded-lg', colorClasses.bg]">
        <UIcon :name="icon" class="w-5 h-5" :class="colorClasses.icon" />
        <div>
            <p class="font-medium" :class="colorClasses.title">{{ title }}</p>
            <p class="text-sm" :class="colorClasses.description">{{ description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
  title: string
  description: string
  color: string
}>()

// Tailwind-safe color mapping
const colorMap = {
    red: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        icon: 'text-red-600 dark:text-red-400',
        title: 'text-red-900 dark:text-red-100',
        description: 'text-red-700 dark:text-red-300',
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        icon: 'text-orange-600 dark:text-orange-400',
        title: 'text-orange-900 dark:text-orange-100',
        description: 'text-orange-700 dark:text-orange-300',
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        icon: 'text-amber-600 dark:text-amber-400',
        title: 'text-amber-900 dark:text-amber-100',
        description: 'text-amber-700 dark:text-amber-300',
    },
    yellow: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        icon: 'text-yellow-600 dark:text-yellow-400',
        title: 'text-yellow-900 dark:text-yellow-100',
        description: 'text-yellow-700 dark:text-yellow-300',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        icon: 'text-green-600 dark:text-green-400',
        title: 'text-green-900 dark:text-green-100',
        description: 'text-green-700 dark:text-green-300',
    },
    teal: {
        bg: 'bg-teal-50 dark:bg-teal-900/20',
        icon: 'text-teal-600 dark:text-teal-400',
        title: 'text-teal-900 dark:text-teal-100',
        description: 'text-teal-700 dark:text-teal-300',
    },
    cyan: {
        bg: 'bg-cyan-50 dark:bg-cyan-900/20',
        icon: 'text-cyan-600 dark:text-cyan-400',
        title: 'text-cyan-900 dark:text-cyan-100',
        description: 'text-cyan-700 dark:text-cyan-300',
    },
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        icon: 'text-blue-600 dark:text-blue-400',
        title: 'text-blue-900 dark:text-blue-100',
        description: 'text-blue-700 dark:text-blue-300',
    },
    indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        icon: 'text-indigo-600 dark:text-indigo-400',
        title: 'text-indigo-900 dark:text-indigo-100',
        description: 'text-indigo-700 dark:text-indigo-300',
    },
    violet: {
        bg: 'bg-violet-50 dark:bg-violet-900/20',
        icon: 'text-violet-600 dark:text-violet-400',
        title: 'text-violet-900 dark:text-violet-100',
        description: 'text-violet-700 dark:text-violet-300',
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        icon: 'text-purple-600 dark:text-purple-400',
        title: 'text-purple-900 dark:text-purple-100',
        description: 'text-purple-700 dark:text-purple-300',
    },
    pink: {
        bg: 'bg-pink-50 dark:bg-pink-900/20',
        icon: 'text-pink-600 dark:text-pink-400',
        title: 'text-pink-900 dark:text-pink-100',
        description: 'text-pink-700 dark:text-pink-300',
    },
    rose: {
        bg: 'bg-rose-50 dark:bg-rose-900/20',
        icon: 'text-rose-600 dark:text-rose-400',
        title: 'text-rose-900 dark:text-rose-100',
        description: 'text-rose-700 dark:text-rose-300',
    },
} as const

const colorClasses = computed(() => {
  return colorMap[props.color as keyof typeof colorMap] ?? colorMap.blue
})
</script>
