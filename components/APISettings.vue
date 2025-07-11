<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <div class="space-y-4">
                <UFormField size="lg" label="Name" help="Name of API Integration" class="w-full">
                    <UInput class="w-full" />
                </UFormField>
                <div class="grid lg:flex gap-4">
                    <UFormField size="lg" label="Method" class="w-full lg:w-1/4" help="HTTP Methods (eg. GET, POST)">
                        <USelect :items="['GET', 'POST', 'PUT', 'PATCH']"
                            placeholder="Select Method" class="w-full" />
                    </UFormField>
                    <UFormField size="lg" label="API EndPoint" class="w-full"
                        help="Path of the API Endpoint including the query string">
                        <UInput class="w-full"
                            placeholder="https://aisp.msu.edu.ph/systems?id:1234" />
                    </UFormField>
                </div>

                <UFormField size="lg" label="Request Options" help="Setup and configure request options">
                    <UTabs :items="apiOptions" variant="link" class="w-full">
                        <template #headers>
                            <JsonEditor v-model:json="header" mode="text" :dark-theme="isDark" />
                        </template>
                        <template #body>
                            <JsonEditor v-model:json="body" mode="text" :dark-theme="isDark" />
                        </template>
                    </UTabs>
                </UFormField>
            </div>

            <UFormField size="lg" label="Select Fields"
                help="Select the fields you want to include in the API response.">
                <template #hint>
                    <!-- <USwitch label="Check ALL" size="sm" /> -->
                    <USwitch label="Check ALL" size="sm" v-model="checkAll" @change="toggleCheckAll" />
                </template>
                <UCard :ui="uiCardConfig" class="mt-2">
                    <!-- <UCheckboxGroup :items="items" :ui="uiCheckboxConfig" /> -->
                    <UCheckboxGroup v-model="selectedItems" :items="items" :ui="uiCheckboxConfig" />
                </UCard>
            </UFormField>

            <div class="grid lg:flex lg:justify-between items-center gap-2">
                <UButton label="Test Connection" icon="i-lucide-monitor-cog" variant="outline" size="lg"
                    class="w-full justify-center lg:w-auto" />
                <UButton label="Save Connection" icon="i-lucide-save" size="lg" 
                    class="w-full justify-center lg:w-auto" />
            </div>
        </div>

        <USeparator />

        <div class="space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">Existing API Connections</h4>
            <CardApis
                v-for="apiEndpoint in apiEndpoints"
                :key="apiEndpoint.id"
                :name="apiEndpoint.name"
                :endpoint="apiEndpoint.endpoint"
                :method="apiEndpoint.method"
                :is-active="apiEndpoint.isActive"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'

const header = ref('')
const body = ref('')

const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})

const apiOptions = [
    { label: 'Headers', slot: 'headers' as const },
    { label: 'Body', slot: 'body' as const },
]

const uiCardConfig = {
    body: 'sm:p-4 overflow-auto'
}

// Checkbox Items
const items = ref<CheckboxGroupItem[]>([
    'ID',
    'Name',
    'Email',
    'Username',
    'Created At',
    'Updated At',
    'Status',
    'Role',
    'Phone',
    'Address',
    'Last Login',
    'Profile Picture',
    'Department',
    'Position',
    'API Key',
    'Access Level',
    'Active',
    'Verified',
    'Notes',
    'Organization',
    'Expiration Date',
    'API Version',
])

// Check ALL functionality
const checkAll = ref(false)
const selected = ref<string[]>([])
const selectedItems = computed({
    get: () => selected.value,
    set: (val: string[]) => {
        selected.value = val
        if (val.length !== items.value.length) {
            checkAll.value = false
        }
    }
})
const toggleCheckAll = () => {
    if (checkAll.value) {
        selectedItems.value = [...items.value]
    } else {
        selectedItems.value = []
    }
}

const uiCheckboxConfig = {
    fieldset: 'grid grid-rows-12 lg:grid-rows-4 grid-flow-col gap-2'
}

// Define an interface for better type safety for your API endpoint data
interface ApiEndpoint {
  id: number;
  name: string;
  endpoint: string;
  method: string;
  isActive: boolean;
}

// Sample data for your API endpoints
const apiEndpoints = ref<ApiEndpoint[]>([
  { 
    id: 1, 
    name: 'Get User Profile', 
    endpoint: '/api/v1/users/{id}', 
    method: 'GET', 
    isActive: true 
  },
  { 
    id: 2, 
    name: 'Create Product', 
    endpoint: '/api/v1/products', 
    method: 'POST', 
    isActive: false 
  },
  { 
    id: 3, 
    name: 'Update Order Status', 
    endpoint: '/api/v1/orders/{id}/status', 
    method: 'PUT', 
    isActive: true 
  },
  { 
    id: 4, 
    name: 'Delete Item', 
    endpoint: '/api/v1/items/{id}', 
    method: 'DELETE', 
    isActive: true 
  },
  { 
    id: 5, 
    name: 'Search Articles', 
    endpoint: '/api/v1/articles/search', 
    method: 'GET', 
    isActive: true 
  },
]);
</script>