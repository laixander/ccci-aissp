<template>
    <Page pageTitle="IT Needs & Productivity"
        pageDescription="Manage department IT requirements and device assignments">
        <template #actions>
            <UButton label="Export Summary" icon="i-lucide-download" size="lg" color="neutral" variant="outline"
                class="w-full lg:w-auto justify-center" />
            <!-- Modal -->
            <FormNewNeeds />
        </template>
        <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardStat v-for="stat in cardStats" :key="stat.label" v-bind="stat" />
            </div>
            <UCard>
                <div class="flex flex-col sm:flex-row gap-4">
                    <UInput icon="i-lucide-search" size="lg" variant="outline"
                        placeholder="Search systems or entities..." :ui="uiSearchConfig" />
                    <USelect v-model="department" :items="departments" size="lg" class="sm:w-48" />
                    <USelect v-model="priority" :items="priorities" size="lg" class="sm:w-48" />
                    <USelect v-model="type" :items="types" size="lg" class="sm:w-48" />
                </div>
            </UCard>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Block title="Department Overview" description="Current IT status across departments">
                    <template #content>
                        <div class="space-y-4">
                            <EmptyState :show="overviews.length === 0"
                                icon="i-lucide-inbox"
                                title="No overview found."
                                description="Click “Add Request” to create your first one."
                            />
                            <CardOverview v-for="overview in overviews" :key="overview.department" v-bind="overview" />
                        </div>
                    </template>
                </Block>
                <Block title="IT Requests & Needs" description="Track and manage productivity enhancement requests">
                    <template #content>
                        <div class="space-y-4">
                            <EmptyState :show="needs.length === 0"
                                icon="i-lucide-inbox"
                                title="No request found."
                                description="Click “Add Request” to create your first one."
                            />
                            <CardNeeds v-for="(need, index) in needs" :key="need.title" v-bind="need"
                                :priority="(need.priority as 'High' | 'Medium' | 'Low')"
                                :type="(need.type as 'Hardware' | 'Software' | 'Infrastructure' | 'Training')"
                                :to="`/productivity/details`"
                                @edit="() => handleEdit(index)" @copy="() => handleCopy(index)"
                                @delete="() => handleDelete(index)" />
                        </div>
                    </template>
                </Block>
            </div>

            <Block title="End-User Device Assignments"
                description="Track and manage device allocations across the organization">
                <template #content>
                    <div class="space-y-4">
                        <CardDevice v-for="device in devices" :key="device.user" v-bind="device"
                            :status="device.status as 'Active' | 'Inactive' | 'Repair' | 'In Repair' | 'Retired'"
                            @edit="onDeviceEdit(device.deviceName)" @delete="onDeviceDelete(device.deviceName)" />
                    </div>
                    <div class="mt-6 flex justify-between items-center">
                        <UButton label="Export Device List" icon="i-lucide-download" size="lg" color="neutral"
                            variant="outline" />
                        <UButton label="Assign Device" icon="i-lucide-plus" size="lg" color="primary" variant="solid" />
                    </div>
                </template>
            </Block>
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    auth: false
})

const cardStats = [
    {
        icon: 'i-lucide-monitor',
        iconColor: 'text-violet-500 dark:text-violet-700',
        label: 'Total Requests',
        value: '4'
    },
    {
        icon: 'i-lucide-clock',
        iconColor: 'text-blue-500 dark:text-blue-700',
        label: 'In Progress',
        value: '1'
    },
    {
        icon: 'i-lucide-wallet',
        iconColor: 'text-green-500 dark:text-green-700',
        label: 'Total Cost',
        value: '₱1,700,000'
    },
    {
        icon: 'i-lucide-triangle-alert',
        iconColor: 'text-red-500 dark:text-red-700',
        label: 'High Priority',
        value: '2'
    }
]

const needs = ref([
    {
        title: "Upgrade Firewall Appliance",
        priority: "High",
        type: "Hardware",
        description: "Replace the main office firewall for enhanced security.",
        entity: "IT Security",
        date: "2025-07-10",
        author: "Jane Doe",
        budget: "₱800,000",
        tags: [
            'System 1', 'System 2', 'ISSP 2.5'
        ]
    },
    {
        title: "Deploy Payroll System",
        priority: "Medium",
        type: "Software",
        description: "Implement a new payroll software for HR automation.",
        entity: "HR Department",
        date: "2025-06-20",
        author: "John Smith",
        budget: "₱400,000",
        tags: [
            'System 1', 'System 2', 'ISSP 2.5'
        ]
    },
    {
        title: "Cybersecurity Training Program",
        priority: "Low",
        type: "Training",
        description: "Mandatory security awareness training for all employees.",
        entity: "Admin Office",
        date: "2025-08-01",
        author: "Alice Lee",
        budget: "₱115,000",
        tags: [
            'System 1', 'System 2', 'ISSP 2.5'
        ]
    },
    {
        title: "Server Room Cooling Upgrade",
        priority: "Medium",
        type: "Infrastructure",
        description: "Upgrade the cooling system to support new servers.",
        entity: "Facilities",
        date: "2025-05-15",
        author: "Bob Chan",
        budget: "₱700,000",
        tags: [
            'System 1', 'System 2', 'ISSP 2.5'
        ]
    }
])

const overviews = [
    {
        department: "IT Security",
        head: "Jane Doe",
        request: 12,
        quantity: 18,
        typeDisplay: [
            'Hardware', 'Software', 'Infrastructure'
        ]
    },
    {
        department: "HR Department",
        head: "John Smith",
        request: 25,
        quantity: 30,
        typeDisplay: [
            'Hardware', 'Software', 'Training'
        ]
    },
    {
        department: "Admin Office",
        head: "Alice Lee",
        request: 8,
        quantity: 10,
        typeDisplay: [
            'Software', 'Training'
        ]
    },
    {
        department: "Facilities",
        head: "Bob Chan",
        request: 15,
        quantity: 22,
        typeDisplay: [
            'Hardware', 'Infrastructure'
        ]
    },
    {
        department: "Finance",
        head: "Maria Cruz",
        request: 10,
        quantity: 14,
        typeDisplay: [
            'Software', 'Hardware'
        ]
    },
    {
        department: "Procurement",
        head: "Carlos Reyes",
        request: 7,
        quantity: 9,
        typeDisplay: [
            'Infrastructure', 'Training'
        ]
    },
    {
        department: "Operations",
        head: "Mark Lim",
        request: 20,
        quantity: 25,
        typeDisplay: [
            'Hardware', 'Infrastructure', 'Training'
        ]
    }
]

function onEdit(department: string) {
    alert(`Edit clicked for: ${department}`)
}

const devices = [
    {
        user: "Jane Doe",
        department: "IT Security",
        deviceType: "Laptop",
        deviceName: "Dell Latitude 7420",
        status: "Active"
    },
    {
        user: "John Smith",
        department: "HR Department",
        deviceType: "Desktop",
        deviceName: "HP EliteDesk 800",
        status: "Inactive"
    },
    {
        user: "Alice Lee",
        department: "Admin Office",
        deviceType: "Tablet",
        deviceName: "iPad Air",
        status: "In Repair"
    },
    {
        user: "Bob Chan",
        department: "Facilities",
        deviceType: "Laptop",
        deviceName: "Lenovo ThinkPad X1",
        status: "Retired"
    }
]

function onDeviceEdit(deviceName: string) {
    console.log(`Edit clicked for: ${deviceName}`)
}

function onDeviceDelete(deviceName: string) {
    console.log(`Delete clicked for: ${deviceName}`)
}

const toast = useToast()

function handleEdit(index: number) {
    console.log(`Edit clicked on card ${index}`)
}

function handleCopy(index: number) {
    const original = needs.value[index]
    const duplicate = {
        ...original,
        title: `${original.title} (Copy)`,
        created: new Date().toLocaleDateString(),
        updated: new Date().toLocaleDateString(),
    }
    needs.value.splice(index + 1, 0, duplicate)
    toast.add({
        title: 'Template duplicated',
        description: `"${original.title}" was successfully copied.`,
        icon: 'i-lucide-copy',
        color: 'primary'
    })
}

function handleDelete(index: number) {
    const template = needs.value[index];
    if (template) {
        needs.value.splice(index, 1)
    }
}

const departments = ref(['All Department', 'IT Security', 'HR Department', 'Admin Office', 'Facilities'])
const department = ref('All Department')

const priorities = ref(['All Priority', 'High', 'Medium', 'Low'])
const priority = ref('All Priority')

const types = ref(['All Type', 'Hardware', 'Software', 'Infrastructure', 'Training'])
const type = ref('All Type')

const uiSearchConfig = {
    root: 'w-full',
}
</script>