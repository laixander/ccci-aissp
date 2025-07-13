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
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Block title="IT Requests & Needs" description="Track and manage productivity enhancement requests">
                    <template #content>
                        <div class="space-y-4">
                            <CardNeeds v-for="need in needs" :key="need.title" v-bind="need" />
                        </div>
                    </template>
                </Block>
                <Block title="Department Overview" description="Current IT status across departments">
                    <template #content>
                        <div class="space-y-4">
                            <CardOverview v-for="overview in overviews" :key="overview.department" v-bind="overview"
                                @edit="onEdit(overview.department)" />
                        </div>
                    </template>
                </Block>
            </div>

            <Block title="End-User Device Assignments"
                description="Track and manage device allocations across the organization">
                <template #content>
                    <div class="space-y-4">
                        <CardDevice v-for="device in devices" :key="device.user" v-bind="device" :status="device.status as 'Active' | 'Inactive' | 'Repair' | 'In Repair' | 'Retired'"
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

const needs = [
    {
        title: "Upgrade Firewall Appliance",
        priority: "High",
        type: "Hardware",
        description: "Replace the main office firewall for enhanced security.",
        entity: "IT Security",
        date: "2025-07-10",
        author: "Jane Doe",
        budget: "₱800,000",
        status: "Requested"
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
        status: "In Progress"
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
        status: "In Review"
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
        status: "Approved"
    }
]

const overviews = [
    {
        department: "IT Security",
        head: "Jane Doe",
        users: 12,
        devices: 18
    },
    {
        department: "HR Department",
        head: "John Smith",
        users: 25,
        devices: 30
    },
    {
        department: "Admin Office",
        head: "Alice Lee",
        users: 8,
        devices: 10
    },
    {
        department: "Facilities",
        head: "Bob Chan",
        users: 15,
        devices: 22
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
</script>