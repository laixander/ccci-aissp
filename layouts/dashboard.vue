<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
        <!-- Header -->
        <header 
            class="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 py-2 border-b border-gray-200 dark:border-b-white/10 backdrop-blur
             bg-white/75 dark:bg-gray-900/75" 
             :class="[!toggleSidebar ? 'md:ml-64' : '']">
            <div class="md:flex-1 mr-2 md:mr-0">
                <UButton 
                    :icon="toggleIcon" 
                    variant="ghost" aria-label="Toggle Sidebar"
                    @click="toggleSidebar = !toggleSidebar" />
            </div>
            <div class="flex items-center gap-2">
                <UBadge :label="appCode" :color="appCodeColor" variant="solid" class="rounded-full px-2" />
                <div class="font-semibold text-sm md:text-center line-clamp-1">{{ appName }}</div>
            </div>
            <div class="flex justify-end items-center gap-4 flex-1">
                <UButton variant="link" icon="i-lucide-bell" />
                <ColorMode />
                <div class="flex items-center gap-2.5">
                    <UAvatar src="https://i.pravatar.cc/40" alt="User Avatar" size="sm" />
                    <div class="hidden lg:flex flex-col items-start">
                        <div class="text-sm font-semibold text-gray-800 dark:text-gray-100">Jane Copper</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Planner</div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Sidebar -->
        <aside 
            class="fixed bottom-0 z-50 w-64 space-y-4 border-r border-gray-200 dark:border-r-white/10 bg-white dark:bg-gray-900
             transition-transform transform top-0 md:h-screen"
            :class="[toggleSidebar ? '-translate-x-full' : 'translate-x-0']" 
            aria-label="Sidebar Navigation"
            @click="handleNavClick">
            <div class="px-4 h-16 flex items-center gap-2 border-b border-gray-200 dark:border-b-white/10">
                <UAvatar size="md" :src="clientLogo" :alt="clientName" />
                <div class="font-semibold text-sm text-gray-800 dark:text-gray-100 leading-tight">
                    {{ clientName }}
                </div>
            </div>
            <UNavigationMenu orientation="vertical" :items="items" :ui="uiNavConfig" />
        </aside>

        <!-- Overlay for small screens -->
        <div 
            v-if="!toggleSidebar"
            class="fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden" 
            @click="toggleSidebar = true" />

        <!-- Main Content -->
        <main 
            class="absolute top-0 left-0 right-0 pt-16 transition-all bg-gray-50 dark:bg-gray-950"
            :class="[!toggleSidebar ? 'md:ml-64' : '']">
            <slot />
        </main>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui';
import { useLayout } from '../composables/useLayout'

const { appName, clientName, clientLogo, appCode, appCodeColor } = useLayout()
clientName.value = 'Digital Solution'
clientLogo.value = '/assets/logo.png'
appName.value = 'Automated Information Systems Strategic Plan Creator'
appCode.value = 'AISSP'
appCodeColor.value = 'primary'

const toggleSidebar = ref(false)

const toggleIcon = computed(() =>
  toggleSidebar.value ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'
)

const MOBILE_BREAKPOINT = 768
const SIDEBAR_CLOSE_DELAY = 200

const handleNavClick = () => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
        setTimeout(() => {
            toggleSidebar.value = true
        }, SIDEBAR_CLOSE_DELAY)
    }
}

const handleResize = () => {
    // Hide sidebar on small screens (below md: ~768px)
    toggleSidebar.value = window.innerWidth < MOBILE_BREAKPOINT
}

onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})

// Allow individual pages to control this
provide('toggleSidebar', toggleSidebar)

const uiNavConfig = {
    label: 'tracking-widest',
    root: 'px-4',
    link: 'p-2.5',
}

const items = ref<NavigationMenuItem[][]>([
    [
        {
          label: 'MAIN NAVIGATION',
          type: 'label'
        },
        {
            label: 'Dashboard',
            icon: 'i-lucide-chart-pie',
            to: '/dashboard'
        },
        {
            label: 'System Management',
            icon: 'i-lucide-database',
            to: '/systems'
        },
        {
            label: 'Office Productivity',
            icon: 'i-lucide-monitor-check',
            to: '/needs'
        },
        {
            label: 'Budget Prototyping',
            icon: 'i-lucide-wallet',
        },
        {
            label: 'ISSP Documents',
            icon: 'i-lucide-file-text',
            to: '/plans'
        },
        {
            label: 'AI Drafting',
            icon: 'i-lucide-bot',
        },
        {
            label: 'Export History',
            icon: 'i-lucide-download',
        },
        {
            label: 'Settings',
            icon: 'i-lucide-settings',
            to: '/settings'
        },

    ],
    [
        {
            label: 'Logout',
            icon: 'i-lucide-log-out',
        },
        {
            label: 'Help',
            icon: 'i-lucide-circle-help',
        }
    ]
])
</script>