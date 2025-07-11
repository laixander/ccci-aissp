<template>
    <USelectMenu 
        v-model="model" 
        :items="entities" 
        placeholder="Select Entity" 
        class="w-full" 
        label-key="name" 
        value-key="id" 
        :multiple="multiple"
        :loading="loading">
        <template #item-label="{item}">
            <div class="flex">
                <div  :style="`background-color: ${item.colorCode};`" class="mt-1 w-3 h-3 rounded-full"/>
                <!-- <div class="px-2 border rounded-sm text-sm text-gray-400 ">{{item.code}}</div> -->
                <div class="mx-2">{{ item.name }}</div>
            </div>
        </template>
    </USelectMenu>
</template>

<script setup lang="ts">
import type { EntityType } from '~~/types/models'

defineProps({
    multiple:{type:Boolean, default: false}
})

const model = defineModel<number>()
const {findAll} = useAPI()
const {results:entities, pending:loading} = await findAll<EntityType>('/entities?paginate=false')


</script>