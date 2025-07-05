<template>
    <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
            <UFormField label="Entity Name" size="lg" class="col-span-3">
                <UInput v-model="entity.name" placeholder="e.g., College of Science" class="w-full" />
            </UFormField>
            <UFormField label="Entity Code" size="lg" class="col-span-2">
                <UInput v-model="entity.code" placeholder="e.g., COS" class="w-full" />
            </UFormField>
            <UFormField label="Color Code" size="lg">
                <UPopover>
                    <UButton :label="entity.colorCode?entity.colorCode:'Choose color'" color="neutral" variant="soft">
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
        <UButton icon="i-lucide-plus" size="lg" color="primary" variant="solid" :loading="loading" @click="add">Add New
            Entity
        </UButton>
    </div>
</template>

<script setup lang="ts">
import type { EntityType } from '@@/types/models';
const { create } = useAPI()
const loading = ref<boolean>(false)
const entity = ref<EntityType>({})

const chip = computed(() => ({ backgroundColor: entity.value.colorCode }))

const add = async () => {
    try {
        loading.value = true
        await create('/entities', entity.value)
    } catch (error) {
        console.log('error :>> ', error);
    } finally {
        loading.value = false
    }
}

</script>