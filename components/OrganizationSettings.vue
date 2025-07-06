<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <div class="grid grid-cols-1 lg:grid-cols-6 gap-4">
                <UFormField label="Entity Name" size="lg" class="col-span-2">
                    <SelectEntity v-model="org.entityId"/>
                </UFormField>
                <UFormField label="Organization Name" size="lg" class="col-span-2">
                    <UInput v-model="org.name" placeholder="e.g., College of Science" class="w-full" />
                </UFormField>
                <UFormField label="Organization Description" size="lg" class="col-span-2">
                    <UInput v-model="org.description" placeholder="e.g., College of Science" class="w-full" />
                </UFormField>
                <UFormField label="Organization Type" size="lg" class="col-span-2">
                    <SelectOrganizationType v-model="org.type"/>
                </UFormField>
                <UFormField label="Organization Head" size="lg" class="col-span-2">
                    <SelectOrganization v-model="org.headId"/>
                </UFormField>
            </div>

            <div class="grid lg:flex lg:justify-end items-center gap-2">
                <UButton label="Save Organization" icon="i-lucide-save" size="lg" variant="solid" :loading="loading" @click="save" class="w-full justify-center lg:w-auto" />
            </div>
        </div>

        <USeparator />
        
        <div class="space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">Existing Organizations</h4>
            <UCard v-if="loading" class="dark:bg-gray-800">
                <USkeleton class="h-4 w-[250px] mb-2 dark:bg-gray-700" />
                <USkeleton class="h-4 w-[200px] dark:bg-gray-700" />
            </UCard>
            <CardOrganization v-for="o in orgs" :key="o.id" v-bind="o" @toggle="toggleStatus(o)" @select="select(o)" class="dark:bg-gray-800"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { OrganizationType } from '~~/types/models';


const { findAll,create, update } = useAPI()
const loading = ref<boolean>(true)
const org = ref<OrganizationType>({})
const { results:orgs } = await findAll<OrganizationType>('/organizations?sort=createdAt:desc')
loading.value = false

const refresh = async()=>{
    org.value = {}
    const { results } = await findAll<OrganizationType>('/organizations?sort=createdAt:desc')
    orgs.value = results.value
}

const save = async () => {
    try {
        loading.value = true
        if(!org.value.id){
            await create('/organizations', org.value)
        }else {
            await update('/organizations', org.value)
        }
        await refresh()
    } catch (error) {
        console.log('error :>> ', error);
    } finally {
        loading.value = false
    }
}

const toggleStatus = async (o:OrganizationType)=>{
    try{
        o.isActive = !o.isActive
        await update('/organizations', o)

    }catch(error){
        console.log('error :>> ', error);
    }
}

const select = (o:OrganizationType)=>{
    org.value = o
}

</script>