<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <UForm :state="state" class="space-y-4">
                <UFormField size="lg" label="Name" help="Name of API Integration" class="w-full">
                    <UInput v-model="state.name" class="w-full"/>
                </UFormField>
                <div class="grid lg:flex gap-4">
                    <UFormField size="lg" label="Method" class="w-full lg:w-1/4" help="HTTP Methods (eg. GET, POST)">
                        <USelect 
                            v-model="state.method" 
                            :items="['GET', 'POST', 'PUT', 'PATCH']" 
                            placeholder="Select Method"
                            class="w-full" />
                    </UFormField>
                    <UFormField size="lg" 
                        label="API EndPoint" 
                        class="w-full"
                        help="Path of the API Endpoint including the query string">
                        <UInput 
                            v-model="state.endpoint" class="w-full"
                            placeholder="https://aisp.msu.edu.ph/systems?id:1234" />
                    </UFormField>
                </div>

                <UFormField size="lg" label="Request Options" help="Setup and configure request options">
                    <UTabs :items="apiOptions" variant="link" class="w-full">
                        <template #headers>
                            <JsonEditor v-model:json="state.header" mode="text" :dark-theme="isDark" />
                        </template>
                        <template #body>
                            <JsonEditor v-model:json="state.body" mode="text" :dark-theme="isDark" />
                        </template>
                    </UTabs>
                </UFormField>
            </UForm>

            <UFormField size="lg" label="Select Fields">
                <UCard :ui="uiCardConfig" class="mt-2">
                    <UCheckboxGroup :items="items" :ui="uiCheckboxConfig" />
                </UCard>
            </UFormField>

            <div class="grid lg:flex lg:justify-between items-center gap-2">
                <UButton label="Test Connection" icon="i-lucide-monitor-cog" variant="outline" size="lg" class="w-full justify-center lg:w-auto" />
                <UButton label="Save Connection" icon="i-lucide-save" size="lg" :loading="loading" @click="save" class="w-full justify-center lg:w-auto" />
            </div>
        </div>

        <USeparator />

        <div class="space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">Existing API Connections</h4>
            <UCard v-if="initializing" class="dark:bg-gray-800">
                <USkeleton class="h-4 w-[250px] mb-2 dark:bg-gray-700" />
                <USkeleton class="h-4 w-[200px] dark:bg-gray-700" />
            </UCard>
            <CardApis v-for="api in apis" :key="api.id" v-bind="api" class="dark:bg-gray-800"/>
        </div>
     </div>
</template>

<script setup lang="ts">
import type { APIConnectionType } from '~~/types/models';

const {findAll, create, update} = useAPI()
const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})

const state = ref<APIConnectionType>({})
const apiOptions = [
    { label: 'Headers', slot: 'headers' as const },
    { label: 'Body', slot: 'body' as const },
]

const {results:apis, pending:initializing} = await findAll('/apis?paginate=false')



const loading = ref<boolean>(false)
const save = async ()=>{
    try {
        loading.value = true
        if(!state.value.id){
            await create('/apis', state.value)
        }else{
            await update('/apis', state.value)
        }
    } catch (error) {
        console.log('error :>> ', error);
    }finally{
        loading.value = false
    }

}

const uiCardConfig = {
    body: 'sm:p-4 overflow-auto'
}

// Checkbox Items
const items = ref<CheckboxGroupItem[]>([
    'All',
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

const uiCheckboxConfig = {
    fieldset: 'grid grid-rows-12 lg:grid-rows-4 grid-flow-col gap-2'
}
</script>