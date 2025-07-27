<template>
    <Page pageTitle="System Management" pageDescription="Manage and prioritize information systems across entities">
        <template #actions>
            <UButton icon="i-lucide-plus" color="primary" variant="solid" size="lg" class="w-full justify-center"
                to="/systems/create">Add New System</UButton>
            <!-- Modal -->
            <!-- <FormNewSystem /> -->
        </template>

        <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardStat v-for="(card, index) in statCards" :key="index" v-bind="card" />
            </div>

            <UCard>
                <div class="flex flex-col sm:flex-row gap-4">
                    <UInput icon="i-lucide-search" size="lg" variant="outline"
                        placeholder="Search systems or entities..." :ui="uiSearchConfig" />
                    <USelect v-model="status" :items="statuses" size="lg" class="sm:w-48" />
                    <USelect v-model="priority" :items="priorities" size="lg" class="sm:w-48" />
                </div>
            </UCard>

            <Block title="Information Systems Registry" description="Drag and drop to reorder by priority or cost">
                <template #content>
                    <div class="space-y-4">
                        <draggable v-model="systems" item-key="id" class="space-y-4" :animation="200"
                            ghost-class="drag-ghost" chosen-class="drag-chosen" handle=".handle">
                            <template #item="{ element: sys }">
                                <CardSystem :key="sys.system" v-bind="sys" @edit="onEdit(sys.system)"
                                    @delete="onDelete(sys.system)" />
                            </template>
                            <!-- Drag ghost clone -->
                            <template #clone="{ element: sys }">
                                <CardSystem :key="'ghost-' + sys.system" v-bind="sys" :forceShow="true"
                                    :hideToggle="true" />
                            </template>
                        </draggable>
                    </div>
                </template>
            </Block>
        </template>
    </Page>
</template>

<script setup lang="ts">
import { statCards } from '~/data/cards'
definePageMeta({
    layout: 'dashboard',
    auth: false
})

import draggable from 'vuedraggable'

const statuses = ref(['All Status', 'Active', 'In Progress', 'Planning', 'Completed'])
const status = ref('All Status')

const priorities = ref(['All Priority', 'High', 'Medium', 'Low'])
const priority = ref('All Priority')

const uiSearchConfig = {
    root: 'w-full',
}

type Sys = {
    id: number
    system: string
    entity: string
    budget: string
    priority: 'low' | 'medium' | 'high'
    status: 'planning' | 'inprogress' | 'active' | 'completed'
    deadline: string
}

const systems = ref<Sys[]>([
    {
        id: 1,
        system: "Student Information System",
        entity: "Registrar Office",
        budget: "₱2,500,000",
        priority: "high",
        status: "active",
        deadline: "Dec 15, 2024"
    },
    {
        id: 2,
        system: "Learning Management System",
        entity: "Academic Affairs",
        budget: "₱1,800,000",
        priority: "high",
        status: "inprogress",
        deadline: "Jan 10, 2025"
    },
    {
        id: 3,
        system: "Financial Management System",
        entity: "Finance Office",
        budget: "₱3,200,000",
        priority: "medium",
        status: "planning",
        deadline: "Feb 20, 2025"
    },
    {
        id: 4,
        system: "Human Resource Information System",
        entity: "HR Department",
        budget: "₱2,100,000",
        priority: "medium",
        status: "active",
        deadline: "Mar 15, 2025"
    },
    {
        id: 5,
        system: "Library Management System",
        entity: "University Library",
        budget: "₱800,000",
        priority: "low",
        status: "completed",
        deadline: "Apr 25, 2025"
    }
])

function onEdit(system: string) {
    alert(`Edit clicked for: ${system}`)
}
function onDelete(system: string) {
    alert(`Delete clicked for: ${system}`)
}
</script>

<style scoped>
/* .drag-chosen {
    @apply scale-101 z-10 transition-transform duration-200;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
} */

.drag-ghost {
    @apply opacity-0;
}
</style>
