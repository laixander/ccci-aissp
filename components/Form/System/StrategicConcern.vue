<template>
    <UCard variant="soft" class="my-4" :ui="uiCardConfig">
        <template #header>
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Setp 6: Strategic Concern
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        This step collects information about strategic concerns related to the system.
                    </p>
                </div>
                <UButton icon="i-heroicons-plus" color="neutral" @click="addRow">Add Item</UButton>
            </div>
        </template>
        <div class="overflow-x-auto">
            <table class="w-full table-auto border-collapse text-sm">
                <thead>
                    <tr class="*:border-b *:border-gray-200 *:p-4 *:text-left *:font-medium *:text-gray-400 *:dark:border-gray-600 *:dark:text-gray-200">
                        <th class="!pl-6">
                            Major Final Output
                        </th>
                        <th>
                            Critical Manoperatingment/ Operating/ Business Systems
                        </th>
                        <th>
                            Problems
                        </th>
                        <th>
                            Intended Use of ICT
                        </th>
                        <th class="!pr-6 w-32">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-gray-50 dark:bg-gray-800/50">
                    <tr v-if="entries.length === 0">
                        <td colspan="5">
                            <div class="flex flex-col justify-center items-center gap-1.5 py-12">
                                <UIcon name="i-lucide-inbox" class="w-12 h-12 text-gray-200 dark:text-gray-700" />
                                <span class="text-gray-400 dark:text-gray-500">No Data Available</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(entry, index) in entries" :key="index" class="*:border-b *:border-gray-100 *:p-4 *:text-gray-500 *:dark:border-gray-700 *:dark:text-gray-400">
                        <td class="!pl-6">
                            <template v-if="entry.editing">
                                <UInput v-model="entry.output" class="w-full" />
                            </template>
                            <template v-else>
                                {{ entry.output }}
                            </template>
                        </td>
                        <td>
                            <template v-if="entry.editing">
                                <UInput v-model="entry.operating" class="w-full" />
                            </template>
                            <template v-else>
                                {{ entry.operating }}
                            </template>
                        </td>
                        <td>
                            <template v-if="entry.editing">
                                <UTextarea v-model="entry.problem" placeholder="Enter items separated by commas" :rows="1" class="w-full" />
                            </template>
                            <template v-else>
                                <ul class="list-disc list-inside text-sm space-y-0.5">
                                    <li v-for="problem in entry.problems" :key="problem">{{ problem }}</li>
                                </ul>
                            </template>
                        </td>
                        <td class="!pr-6">
                            <template v-if="entry.editing">
                                <UTextarea v-model="entry.use" placeholder="Enter items separated by commas" :rows="1" class="w-full" />
                            </template>
                            <template v-else>
                                <ul class="list-disc list-inside text-sm space-y-0.5">
                                    <li v-for="use in entry.uses" :key="use">{{ use }}</li>
                                </ul>
                            </template>
                        </td>
                        <td class="space-x-1">
                            <UButton :icon="entry.editing ? 'i-lucide-save' : 'i-lucide-edit'" color="neutral" variant="ghost" size="sm" @click="toggleEdit(index)" />
                            <UButton icon="i-heroicons-trash" color="error" variant="ghost" size="sm" @click="deleteRow(index)" />
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
    output: string
    operating: number | string
    problem: string
    problems: string[]
    use: string
    uses: string[]
    editing: boolean
}

const entries = reactive<Entry[]>([
])

function addRow() {
    entries.push({
        output: '',
        operating: '',
        problem: '',
        problems: [],
        use: '',
        uses: [],
        editing: true
    })
}

function toggleEdit(index: number) {
    const row = entries[index]
    if (!row) return;
    if (row.editing) {
        row.problems = row.problem
            .split(',')
            .map(h => h.trim())
            .filter(Boolean)

        row.uses = row.use
            .split(',')
            .map(h => h.trim())
            .filter(Boolean)
    } else {
        row.problem = row.problems.join(', ')
        row.use = row.uses.join(', ')
    }
    row.editing = !row.editing
}


function deleteRow(index: number) {
    entries.splice(index, 1)
}

const uiCardConfig = {
    body: 'p-0 sm:p-0'
}
</script>
