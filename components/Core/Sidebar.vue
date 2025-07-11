<template>
    <div class="border-r border-r-slate-200 min-h-[100vh]" >
        <div class="flex gap-1 p-2">
            <NuxtImg src="/assets/logo.png" :placeholder="[50, 50]" sizes="50px"/>
            <div>
                <p class="font-bold text-lg">AISSP</p>
                <div class="font=light text-xs">Automated ISSP</div>
            </div>
        </div>
        <USeparator/>
        <div class="pr-4">
            <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48 space-y-4" />
        </div>
        
    </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

    const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'System Menu',
      type: 'label'
    },
    {
      label: 'Dashboard',
      icon: 'lucide:layout-dashboard'
    },
    {
      label: 'System Management',
      icon: 'i-lucide-database',
    },
    {
      label: 'Office Productivity',
      icon: 'material-symbols:desktop-windows-outline',
    },
    {
      label: 'Budget Prototyping',
      icon: 'material-symbols:account-balance-wallet-outline',
    },
    {
      label: 'ISSP Documents',
      icon: 'tabler:file-text',
    },
    {
      label: 'AI Drafting',
      icon: 'ri:robot-2-line',
    },
     {
      label: 'Export History',
      icon: 'material-symbols:download',
    },
    
  ],
  [
    {
      label: 'Settings',
      icon: 'material-symbols:settings',
    },
    {
      label: 'Logout',
      icon: 'i-lucide-circle-help',
    }
  ]
])
</script>