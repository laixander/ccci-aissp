<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <UForm :state="state" class="space-y-2">
                <div class="grid lg:flex gap-4">
                    <UFormField size="lg" class="w-full" label="Host" help="Databse hostname">
                        <UInput v-model="state.host" class="w-full" placeholder="127.0.0.1" />
                    </UFormField>
                    <UFormField size="lg" label="Port" help="Databse port number">
                        <UInput v-model="state.port" class="w-full lg:w-auto" placeholder="5432" type="number"/>
                    </UFormField>
                </div>
                <div class="grid lg:flex gap-4">
                    <UFormField size="lg" class="w-full" label="Name" help="Databse name">
                        <UInput v-model="state.name" class="w-full" placeholder="postgres" />
                    </UFormField>
                    <UFormField size="lg" class="w-full" label="Schema" help="Databse schema">
                        <UInput v-model="state.schema" class="w-full" placeholder="public" />
                    </UFormField>
                </div>
                <div class="grid lg:flex gap-4">
                    <UFormField size="lg" class="w-full" label="Username" help="Database username">
                        <UInput  v-model="state.username" class="w-full" placeholder="admin" />
                    </UFormField>
                    <UFormField size="lg" class="w-full" label="Password" help="Database password">
                        <UInput  v-model="state.password" class="w-full" placeholder="admin"/>
                    </UFormField>
                </div>
            </UForm>

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
                        <JsonEditor v-model:json="state.rawQuery" mode="text" :dark-theme="isDark" />
                    </template>
                </UTabs>
            </UFormField>

            <!-- <UFormField size="lg" label="Select Queries">
                <UCard :ui="uiCardConfig" class="mt-2">
                    <UCheckboxGroup :items="queries" :ui="uiCheckboxConfig" />
                </UCard>
            </UFormField> -->

            <UFormField size="lg" label="Description" hint="Optional">
                <UTextarea :rows="4" placeholder="e.g. Optional description for DB settings" class="w-full" />
            </UFormField>

            <div class="grid lg:flex lg:justify-between items-center gap-2">
                <UButton label="Test Connection" icon="i-lucide-monitor-cog" variant="outline" size="lg" class="w-full justify-center lg:w-auto" />
                <UButton label="Save Connection" icon="i-lucide-save" size="lg" :loading="loading" @click="save" class="w-full justify-center lg:w-auto" />
            </div>
        </div>

        <USeparator />

        <div class="mt-4 space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">Existing DB Connections</h4>
            <UCard v-if="initializing" class="dark:bg-gray-800">
                <USkeleton class="h-4 w-[250px] mb-2 dark:bg-gray-700" />
                <USkeleton class="h-4 w-[200px] dark:bg-gray-700" />
            </UCard>
            <CardDatabase v-for="db in databases" :key="db.id" v-bind="db" class="dark:bg-gray-800" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DbConnectionType } from '~~/types/models';

const {findAll, create} = useAPI()

const state = ref<DbConnectionType>({})

const {results:databases, pending:initializing} = await findAll('/databases?paginate=false')

const refresh = async ()=>{
    const {results, pending} = await findAll('/databases?paginate=false')
    databases.value = results.value
    initializing.value = pending.value
}

const loading = ref<boolean>(false)
const save = async()=>{
    try{
        loading.value = true
        await create('/databases', state.value)
        await refresh()
    }catch(error){
        console.log('error :>> ', error);
    }finally{
        loading.value = false
    }
    
}
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
</script>