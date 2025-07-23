<template>
    <UCard class="shadow-sm hover:shadow-md transition-shadow">
        <div class="grid gap-4">
            <!-- Header -->
            <div class="flex items-start justify-between">
                <div class="space-y-1">
                    <div class="md:flex items-center gap-3">
                        <UBadge 
                            :label="status" 
                            :color="status === 'Active' ? 'success' : 'neutral'" 
                            variant="soft"
                            class="rounded-full order-1 mb-2 md:mb-0" 
                        />
                        <h3 class="font-semibold tracking-tight text-lg text-default order-0">{{ title }}</h3>
                    </div>
                    <p class="text-sm text-muted">{{ description }}</p>
                </div>

                <!-- Show on small screen only -->
                <div class="relative" ref="actionsRef">
                    <div class="md:hidden">
                        <UButton icon="i-lucide-ellipsis" variant="ghost" color="neutral" @click="showActions = !showActions" />
                    </div>
                    <!-- Hide on small screen only and toggle by the button above -->
                    <div class="flex items-center space-x-2 bg-white  dark:bg-gray-800 md:dark:bg-transparent border md:border-0 border-gray-200 dark:border-gray-700 rounded-md shadow-xl md:shadow-none p-2 md:p-0 absolute right-0"
                    :class="{ 'hidden md:flex': !showActions, 'flex md:flex': showActions }">
                        <UTooltip text="Edit Template">
                            <UButton icon="i-lucide-square-pen" color="neutral" variant="ghost" size="sm"
                                @click="$emit('edit')" />
                        </UTooltip>

                        <UTooltip text="Duplicate Template">
                            <UButton 
                                icon="i-lucide-copy" 
                                color="neutral" 
                                variant="ghost" 
                                size="sm"
                                @click="$emit('copy')" 
                            />
                        </UTooltip>

                        <Confirmation @delete="$emit('delete')">
                            <template #action>
                                <UTooltip text="Delete Template">
                                    <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="sm" aria-label="Delete" />
                                </UTooltip>
                            </template>
                            <template #message>
                                <p class="text-gray-800 dark:text-gray-100 font-medium">
                                    Are you sure you want to delete this
                                    <span class="font-extrabold text-primary">{{ title }}</span> section?
                                </p>
                            </template>
                        </Confirmation>
                    </div>
                </div>
            </div>

            <!-- Sections -->
            <div class="grid lg:flex items-center lg:justify-between gap-4">
                <div class="grid md:flex items-center gap-2">
                    <div class="text-sm font-medium text-toned">Sections:</div>
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
                    <!-- <UButton label="Add Sections" icon="i-lucide-plus" size="xs" variant="ghost" class="rounded-full"
                        to="/templates/create" /> -->
                </div>
                <!-- <UBadge 
                    :label="`${sections.length} sections`" 
                    variant="outline" 
                    color="neutral" 
                    class="rounded-full" 
                /> -->
                <UButton label="Add Sections" icon="i-lucide-list-plus" variant="outline" class="justify-center" to="/templates/create" />
            </div>

            <!-- Metadata -->
            <div class="hidden md:flex items-center gap-4 text-sm">
                <div class="flex items-center gap-1 text-muted">
                    <UIcon name="i-lucide-user" class="w-4 h-4" />
                    {{ user }}
                </div>
                <div class="flex items-center gap-1 text-muted">
                    <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                    {{ created }}
                </div>
                <div class="flex items-center gap-1 text-muted">
                    <UIcon name="i-lucide-square-pen" class="w-4 h-4" />
                    {{ updated }}
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showActions = ref(false)
const actionsRef = ref<HTMLElement | null>(null)

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

const handleResize = () => {
    showActions.value = false
}

const handleClickOutside = (event: MouseEvent) => {
    if (showActions.value && actionsRef.value && !actionsRef.value.contains(event.target as Node)) {
        showActions.value = false
    }
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('click', handleClickOutside)
})
</script>
