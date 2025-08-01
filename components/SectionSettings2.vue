<template>
    <UModal fullscreen v-model:open="open">
        <UButton label="Create Section" icon="i-lucide-plus" color="neutral" size="lg" block />
        <template #content="{ close }" >
            <div class="relative flex divide-x divide-gray-200 dark:divide-gray-800 h-full">
                <div class="flex flex-col gap-4 p-4">
                    <UButton
                        v-for="{ icon, section } in sidebarButtons"
                        :key="section"
                        :icon="icon"
                        variant="ghost"
                        color="neutral"
                        size="lg"
                        @click="setActive(section)"
                        :class="{
                            'bg-gray-100 text-primary dark:bg-gray-800 dark:text-primary': activeSection === section
                        }"
                    />
                </div>
                <div class="flex flex-col w-xl">
                    <SectionInfo v-if="activeSection === 'info'" />
                    <SectionText v-if="activeSection === 'text'" />
                    <SectionImage v-if="activeSection === 'image'" />
                    <div v-if="activeSection === 'system'">System Section</div>
                    <div v-if="activeSection === 'database'">Database Section</div>
                    <div v-if="activeSection === 'api'">API Section</div>
                    <div v-if="activeSection === 'ai'">AI Section</div>
                    <!-- <div v-if="!activeSection">Select a section from the sidebar.</div> -->
                    <div class="grid lg:grid-cols-2 gap-4 mt-auto p-4 border-t border-gray-200 dark:border-gray-800 bg-default *:justify-center">
                        <UButton label="Cancel" variant="outline" color="neutral" size="lg" @click="close" />
                        <UButton label="Save Section" size="lg" />
                    </div>
                </div>
                <TipTapEditor />
            </div>
        </template>
    </UModal>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)

const activeSection = ref('info') // default to nothing selected

const setActive = (section) => {
    activeSection.value = section
}

const sidebarButtons = [
    { icon: 'i-lucide-info', section: 'info' },
    { icon: 'i-lucide-file-type', section: 'text' },
    { icon: 'i-lucide-image', section: 'image' },
    { icon: 'i-lucide-monitor-cog', section: 'system' },
    { icon: 'i-lucide-database', section: 'database' },
    { icon: 'i-lucide-unplug', section: 'api' },
    { icon: 'i-lucide-sparkles', section: 'ai' }
]
</script>

<style scoped>
</style>