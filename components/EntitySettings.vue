<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <div class="grid lg:flex items-center gap-4">
                <UFormField label="Entity Name" size="lg" class="w-full">
                    <UInput v-model="entity.name" placeholder="e.g., College of Science" class="w-full" />
                </UFormField>
                <UFormField label="Entity Code" size="lg" class="w-full lg:w-1/4">
                    <UInput v-model="entity.code" placeholder="e.g., COS" class="w-full" />
                </UFormField>
                <UFormField label="Color Code" size="lg" class="w-full lg:w-auto">
                    <UPopover>
                        <UButton :label="entity.colorCode?entity.colorCode:'Choose color'" color="neutral" variant="soft" size="lg" class="w-full justify-center">
                            <template #leading>
                                <span :style="chip" class="size-3 rounded-full" />
                            </template>
                        </UButton>

                        <template #content>
                            <UColorPicker v-model="entity.colorCode" class="p-2" />
                        </template>
                    </UPopover>
                </UFormField>
            </div>

            <div class="grid lg:flex lg:justify-end items-center gap-2">
                <UButton label="Save Entity" icon="i-lucide-save" size="lg" color="primary" variant="solid" :loading="loading" @click="save" class="w-full justify-center lg:w-auto" />
            </div>
        </div>

        <USeparator />

        <div class="space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">Existing Entities</h4>
            <UCard v-if="loading" class="dark:bg-gray-800">
                <USkeleton class="h-4 w-[250px] mb-2 dark:bg-gray-700" />
                <USkeleton class="h-4 w-[200px] dark:bg-gray-700" />
            </UCard>
            <CardEntity
                v-for="ent in entities"
                :key="ent.id"
                v-bind="ent"
                @toggle="toggleStatus(ent)"
                @select="select(ent)"
                class="dark:bg-gray-800"
            />
        </div>
    </div>

</template>

<script setup lang="ts">
import type { EntityType } from '~~/types/models';


const { findAll,create, update } = useAPI()
const loading = ref<boolean>(true)
const entity = ref<EntityType>({})
const { results:entities } = await findAll<EntityType>('/entities?sort=createdAt:desc')
loading.value = false

const refresh = async()=>{
    entity.value = {}
    const { results } = await findAll<EntityType>('/entities?sort=createdAt:desc')
    entities.value = results.value
}

const chip = computed(() => ({ backgroundColor: entity.value.colorCode || '#d1d5db' }))

const save = async () => {
    try {
        loading.value = true
        if(!entity.value.id){
            await create('/entities', entity.value)
        }else {
            await update('/entities', entity.value)
        }
        await refresh()
    } catch (error) {
        console.log('error :>> ', error);
    } finally {
        loading.value = false
    }
}

const toggleStatus = async (ent:EntityType)=>{
    try{
        ent.isActive = !ent.isActive
        await update('/entities', ent)

    }catch(error){
        console.log('error :>> ', error);
    }
}

const select = (ent:EntityType)=>{
    entity.value = ent
}

</script>