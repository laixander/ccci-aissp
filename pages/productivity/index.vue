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
                <div class="flex flex-col lg:flex-row gap-4">
                    <UInput icon="i-lucide-search" size="lg" variant="outline"
                        placeholder="Search systems or entities..." :ui="uiSearchConfig" />
                    <USelect v-model="department" :items="departments" size="lg" class="lg:w-48" />
                    <USelect v-model="priority" :items="priorities" size="lg" class="lg:w-48" />
                    <USelect v-model="type" :items="types" size="lg" class="lg:w-48" />
                </div>
            </UCard>
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Block title="Department Overview" description="Current IT status across departments">
                    <template #content>
                        <div class="space-y-4">
                            <EmptyState :show="overviews.length === 0"
                                icon="i-lucide-inbox"
                                title="No overview found."
                                description="Click “Add Request” to create your first one."
                            />
                            <CardOverview v-for="item in overviews" :key="item.department" v-bind="item" :typeDisplay="(item.typeDisplay as [])" />
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

            <!-- <Block title="End-User Device Assignments"
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
            </Block> -->

            <Block title="Top Request Items" description="Most requested IT items across all departments">
                <template #content>
                    <div class="space-y-3">
                        <CardTopRequest
                            v-for="item in requests" :key="item.request" v-bind="item"
                            :priority="(item.priority as 'High' | 'Medium' | 'Low')"
                            :actions="['view', 'delete']"
                            @view="onRequestView(item.request)"
                            @delete-confirmed="onRequestDelete(item.request)"
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
        department: "Computer Science",
        head: "Dr. Angela Reyes",
        request: 20,
        quantity: 35,
        typeDisplay: [
            'Hardware', 'Software', 'Network Equipment'
        ]
    },
    {
        department: "Engineering",
        head: "Engr. Mark Villanueva",
        request: 18,
        quantity: 28,
        typeDisplay: [
            'Hardware', 'CAD Software', 'Servers'
        ]
    },
    {
        department: "Business Administration",
        head: "Prof. Carla Dizon",
        request: 12,
        quantity: 20,
        typeDisplay: [
            'Software', 'Laptops', 'Projectors'
        ]
    },
    {
        department: "Education",
        head: "Dr. Liza Santos",
        request: 10,
        quantity: 15,
        typeDisplay: [
            'E-Learning Tools', 'Tablets', 'Training'
        ]
    },
    {
        department: "Nursing",
        head: "Dean Roberto Tan",
        request: 14,
        quantity: 22,
        typeDisplay: [
            'Simulation Software', 'Hardware', 'Technical Support'
        ]
    },
    {
        department: "Library Services",
        head: "Ms. Joanna Lim",
        request: 8,
        quantity: 10,
        typeDisplay: [
            'Digital Catalog Systems', 'Scanners', 'Software'
        ]
    },
    {
        department: "Multimedia Arts",
        head: "Mr. Paolo Garcia",
        request: 16,
        quantity: 24,
        typeDisplay: [
            'Editing Software', 'High-End PCs', 'Storage Devices'
        ]
    },
    {
        department: "Research and Development",
        head: "Dr. Evelyn Bautista",
        request: 9,
        quantity: 14,
        typeDisplay: [
            'Data Analysis Tools', 'Cloud Services', 'Laptops'
        ]
    }
];


// const devices = [
//     {
//         user: "Jane Doe",
//         department: "IT Security",
//         deviceType: "Laptop",
//         deviceName: "Dell Latitude 7420",
//         status: "Active"
//     },
//     {
//         user: "John Smith",
//         department: "HR Department",
//         deviceType: "Desktop",
//         deviceName: "HP EliteDesk 800",
//         status: "Inactive"
//     },
//     {
//         user: "Alice Lee",
//         department: "Admin Office",
//         deviceType: "Tablet",
//         deviceName: "iPad Air",
//         status: "In Repair"
//     },
//     {
//         user: "Bob Chan",
//         department: "Facilities",
//         deviceType: "Laptop",
//         deviceName: "Lenovo ThinkPad X1",
//         status: "Retired"
//     }
// ]

// function onDeviceEdit(deviceName: string) {
//     console.log(`Edit clicked for: ${deviceName}`)
// }

// function onDeviceDelete(deviceName: string) {
//     console.log(`Delete clicked for: ${deviceName}`)
// }

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

const requests = [
    {
        request: 'Laptop Upgrades',
        count: 24,
        budget: 2400000,
        trend: +15,
        priority: 'High'
    },
    {
        request: 'Network Infrastructure',
        count: 18,
        budget: 1800000,
        trend: +8,
        priority: 'High'
    },
    {
        request: 'Software Licenses',
        count: 15,
        budget: 750000,
        trend: +22,
        priority: 'Medium'
    },
    {
        request: 'Laptop Upgrades',
        count: 5,
        budget: 900000,
        trend: +5,
        priority: 'Medium'
    },
    {
        request: 'Laptop Upgrades',
        count: 24,
        budget: 2400000,
        trend: -3,
        priority: 'Low'
    }
]

function onRequestView(request: string) {
    alert(`Edit clicked for: ${request}`)
}

function onRequestDelete(request: string) {
    alert(`Delete clicked for: ${request}`)
}

</script>