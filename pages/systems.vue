<template>
    <Page pageTitle="System Management" pageDescription="Manage and prioritize information systems across entities">
        <template #actions>
            <!-- Modal -->
            <FormNewSystem />
        </template>
    
        <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardStat
                    v-for="stat in cardStats"
                    :key="stat.label"
                    v-bind="stat"
                />
            </div>

            <UCard>
                <div class="flex flex-col sm:flex-row gap-4">
                    <UInput icon="i-lucide-search" size="lg" variant="outline" placeholder="Search systems or entities..." :ui="uiSearchConfig" />
                    <USelect v-model="status" :items="statuses" size="lg" class="sm:w-48" />
                    <USelect v-model="priority" :items="priorities" size="lg" class="sm:w-48" />
                </div>
            </UCard>

            <Block title="Information Systems Registry" description="Drag and drop to reorder by priority or cost">
                <template #content>
                    <div class="space-y-4">
                        <CardSystem
                            v-for="sys in systems"
                            :key="sys.system"
                            v-bind="sys"
                            @edit="onEdit(sys.system)"
                            @delete="onDelete(sys.system)"
                        />
                    </div>
                </template>
            </Block>
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    auth:false
})

const statuses = ref(['All Status', 'Active', 'In Progress', 'Planning', 'Completed'])
const status = ref('All Status')

const priorities = ref(['All Priority', 'High', 'Medium', 'Low'])
const priority = ref('All Priority')

const uiSearchConfig = {
    root: 'w-full',
}

const cardStats = [
  {
    icon: 'i-lucide-wallet',
    iconColor: 'text-green-500 dark:text-green-700',
    label: 'Total Budget',
    value: '₱10,400,000'
  },
  {
    icon: 'i-lucide-triangle-alert',
    iconColor: 'text-red-500 dark:text-red-700',
    label: 'High Priority',
    value: '2'
  },
  {
    icon: 'i-lucide-calendar',
    iconColor: 'text-blue-500 dark:text-blue-700',
    label: 'Active Systems',
    value: '2'
  },
  {
    icon: 'i-lucide-filter',
    iconColor: 'text-violet-500 dark:text-violet-700',
    label: 'Total Systems',
    value: '5'
  }
]

const systems = [
  {
    system: "Student Information System",
    entity: "Registrar Office",
    budget: "₱2,500,000",
    priority: "high",
    status: "active",
    deadline: "Dec 15, 2024"
  },
  {
    system: "Learning Management System",
    entity: "Academic Affairs",
    budget: "₱1,800,000",
    priority: "high",
    status: "inprogress",
    deadline: "Jan 10, 2025"
  },
  {
    system: "Financial Management System",
    entity: "Finance Office",
    budget: "₱3,200,000",
    priority: "medium",
    status: "planning",
    deadline: "Feb 20, 2025"
  },
  {
    system: "Human Resource Information System",
    entity: "HR Department",
    budget: "₱2,100,000",
    priority: "medium",
    status: "active",
    deadline: "Mar 15, 2025"
  },
  {
    system: "Library Management System",
    entity: "University Library",
    budget: "₱800,000",
    priority: "low",
    status: "completed",
    deadline: "Apr 25, 2025"
  }
]

function onEdit(system: string) {
  alert(`Edit clicked for: ${system}`)
}
function onDelete(system: string) {
  alert(`Delete clicked for: ${system}`)
}
</script>
