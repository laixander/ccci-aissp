<template>
    <div class="dark:bg-gray-900 bg-white py-3 px-2 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 h-[10vh]">
        <div class="flex justify-between">
        <div class="flex gap-1 align-bottom">
            <!-- <UButton variant="link" icon="lucide:panel-left-close"/> -->
            <UIcon name="lucide:panel-left-close" class="text-xl mt-1 cursor-pointer hover:text-primary-500"/> 
            <div class="font-bold mt-0.5">Dashboard</div>
        </div>
        <div class="flex gap-1 align-bottom">
            <UInput placeholder="Search here..." icon="mdi:magnify"/>
        </div>
        <div class="flex gap-2 align-bottom">
            <UBadge class="rounded-xl" variant="soft">Planner</UBadge>
            <UButton variant="link" icon="material-symbols:notifications-outline"/>
            <div class="flex gap-2 align-bottom">
                <UAvatar size="lg">AB</UAvatar>
                <div>
                    <div class="text-sm font-bold">Ariel Balita</div>
                    <div class="text-xs font-light">ISSP Planner</div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
