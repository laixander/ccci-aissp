<template>
    <UCard variant="soft" class="my-4" :ui="uiCardConfig">
        <template #header>
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Setp 5: Deliverables
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        This step collects information about deliverables related to the system.
                    </p>
                </div>
                <UButton icon="i-heroicons-plus" color="neutral" @click="addRow">Add Item</UButton>
            </div>
        </template>

        <div class="overflow-x-auto">
            <table class="w-full table-auto border-collapse text-sm">
                <thead>
                    <tr
                        class="*:border-b *:border-gray-200 *:p-4 *:text-left *:font-medium *:text-gray-400 *:dark:border-gray-600 *:dark:text-gray-200">
                        <th class="!pl-6">Title</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Unit Cost</th>
                        <th class="!pr-6 w-32">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-50 dark:bg-gray-800/50">
                    <tr v-if="entries.length === 0">
                        <td colspan="7">
                            <div class="flex flex-col justify-center items-center gap-1.5 py-12">
                                <UIcon name="i-lucide-inbox" class="w-12 h-12 text-gray-200 dark:text-gray-700" />
                                <span class="text-gray-400 dark:text-gray-500">No Data Available</span>
                            </div>
                        </td>
                    </tr>

                    <tr v-for="(entry, index) in entries" :key="index"
                        class="*:border-b *:border-gray-100 *:p-4 *:text-gray-500 *:dark:border-gray-700 *:dark:text-gray-400">
                        <td class="!pl-6">
                            <template v-if="entry.editing">
                                <UInput v-model="entry.title" class="w-full" />
                            </template>
                            <template v-else>
                                {{ entry.title }}
                            </template>
                        </td>
                        <td>
                            <template v-if="entry.editing">
                                <UInput v-model="entry.description" class="w-full" />
                            </template>
                            <template v-else>
                                {{ entry.description }}
                            </template>
                        </td>
                        <td>
                            <template v-if="entry.editing">
                                <UInput v-model="entry.type" class="w-full" />
                            </template>
                            <template v-else>
                                {{ entry.type }}
                            </template>
                        </td>
                        <td>
                            <template v-if="entry.editing">
                                <UInputNumber v-model="entry.quantity" class="w-full" />
                            </template>
                            <template v-else>
                                {{ entry.quantity }}
                            </template>
                        </td>
                        <td>
                            <template v-if="entry.editing">
                                <UInput v-model="entry.unit" class="w-full" />
                            </template>
                            <template v-else>
                                {{ entry.unit }}
                            </template>
                        </td>
                        <td>
                            <template v-if="entry.editing">
                                <UInputNumber 
                                    v-model="entry.unitCost" 
                                    :format-options="{
                                        style: 'currency',
                                        currency: 'PHP',
                                        currencyDisplay: 'code',
                                        currencySign: 'accounting'
                                    }"
                                    class="w-full" 
                                />
                            </template>
                            <template v-else>
                                {{ entry.unitCost }}
                            </template>
                        </td>
                        <td class="space-x-1 !pr-6">
                            <UButton :icon="entry.editing ? 'i-lucide-save' : 'i-lucide-edit'" color="neutral"
                                variant="ghost" size="sm" @click="toggleEdit(index)" />
                            <UButton icon="i-heroicons-trash" color="error" variant="ghost" size="sm"
                                @click="deleteRow(index)" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

type Entry = {
    title: string
    description: string
    type: string
    quantity: number
    unit: string
    unitCost: number
    editing: boolean
}

const entries = reactive<Entry[]>([])

function addRow() {
    entries.push({
        title: '',
        description: '',
        type: '',
        quantity: 0,
        unit: '',
        unitCost: 0,
        editing: true
    })
}

function toggleEdit(index: number) {
    const row = entries[index]
    if (!row) return;
    row.editing = !row.editing
}

function deleteRow(index: number) {
    entries.splice(index, 1)
}

const uiCardConfig = {
    body: 'p-0 sm:p-0'
}
</script>
