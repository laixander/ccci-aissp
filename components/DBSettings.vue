<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <div class="space-y-2">
                <div class="grid lg:flex gap-4">
                    <UFormField size="lg" class="w-full" label="Host" help="Databse hostname">
                        <UInput class="w-full" placeholder="127.0.0.1" />
                    </UFormField>
                    <UFormField size="lg" label="Port" help="Databse port number">
                        <UInput class="w-full lg:w-auto" placeholder="5432" type="number"/>
                    </UFormField>
                </div>
                <div class="grid lg:flex gap-4">
                    <UFormField size="lg" class="w-full" label="Name" help="Databse name">
                        <UInput class="w-full" placeholder="postgres" />
                    </UFormField>
                    <UFormField size="lg" class="w-full" label="Schema" help="Databse schema">
                        <UInput class="w-full" placeholder="public" />
                    </UFormField>
                </div>
                <div class="grid lg:flex gap-4">
                    <UFormField size="lg" class="w-full" label="Username" help="Database username">
                        <UInput class="w-full" placeholder="admin" />
                    </UFormField>
                    <UFormField size="lg" class="w-full" label="Password" help="Database password">
                        <UInput class="w-full" placeholder="admin"/>
                    </UFormField>
                </div>
            </div>

            <UFormField size="lg" label="DB Options" help="Setup and configure db options">
                <UTabs :items="queryOptions" variant="link" class="w-full">
                    <template #table>
                        <UFormField size="lg" label="Select Tables">
                            <template #hint>
                                <!-- <USwitch label="Check ALL" size="sm" /> -->
                                <USwitch label="Check ALL" size="sm" v-model="checkAll" @change="toggleCheckAll" />
                            </template>
                            <UCard :ui="uiCardConfig" class="mt-2">
                                <!-- <UCheckboxGroup :items="items" :ui="uiCheckboxConfig" /> -->
                                <UCheckboxGroup v-model="selectedItems" :items="items" :ui="uiCheckboxConfig" />
                            </UCard>
                        </UFormField>
                    </template>
                    <template #rawQuery>
                        <JsonEditor v-model:json="rawQuery" mode="text" :dark-theme="isDark" />
                    </template>
                </UTabs>
            </UFormField>

            <UFormField size="lg" label="Description" hint="Optional">
                <UTextarea :rows="4" placeholder="e.g. Optional description for DB settings" class="w-full" />
            </UFormField>

            <div class="grid lg:flex lg:justify-between items-center gap-2">
                <UButton label="Test Connection" icon="i-lucide-monitor-cog" variant="outline" size="lg" class="w-full justify-center lg:w-auto" />
                <UButton label="Save Connection" icon="i-lucide-save" size="lg" class="w-full justify-center lg:w-auto" />
            </div>
        </div>

        <USeparator />

        <div class="mt-4 space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">Existing DB Connections</h4>
            <CardDatabase 
                v-for="dbConnection in dbConnections"
                :key="dbConnection.id"
                :host="dbConnection.host"
                :port="dbConnection.port"
                :name="dbConnection.name"
                :schema="dbConnection.schema"
                :is-active="dbConnection.isActive"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CheckboxGroupItem } from '@nuxt/ui'
const rawQuery = ref('')
const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})

const queryOptions = [
    { label: 'Table', slot: 'table' as const },
    { label: 'Raw Query', slot: 'rawQuery' as const }
]

const uiCardConfig = {
    body: 'sm:p-4 overflow-auto'
}

// Checkbox Items
const items = ref<CheckboxGroupItem[]>([
    'All',
    'users',
    'orders',
    'products',
    'categories',
    'customers',
    'invoices',
    'payments',
    'shipments',
    'suppliers',
    'employees',
    'departments',
    'roles',
    'permissions',
    'logs',
    'settings',
    'notifications',
    'reviews',
    'sessions',
    'audit_trail',
    'attachments',
    'messages',
    'subscriptions',
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

// Define an interface for better type safety for your database connection data
interface DbConnection {
  id: number;
  host: string;
  port: string;
  name: string;
  schema: string;
  isActive: boolean;
}

// Sample data for your database connections
const dbConnections = ref<DbConnection[]>([
  { 
    id: 1, 
    host: 'db.example.com', 
    port: '5432', 
    name: 'prod_main_db', 
    schema: 'public', 
    isActive: true 
  },
  { 
    id: 2, 
    host: 'localhost', 
    port: '3306', 
    name: 'dev_auth_db', 
    schema: 'auth_schema', 
    isActive: false 
  },
  { 
    id: 3, 
    host: '192.168.1.10', 
    port: '27017', 
    name: 'analytics_mongo', 
    schema: 'metrics', 
    isActive: true 
  },
  { 
    id: 4, 
    host: 'backup-db.cloud.net', 
    port: '5432', 
    name: 'archive_data', 
    schema: 'old_data', 
    isActive: true 
  },
]);
</script>