<template>
    <div class="">
        <div class="flex justify-between items-center">
            <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Performance Metrics
            </h3>
            <UButton icon="i-heroicons-plus" color="neutral" @click="addLevelRow">Add Level Block</UButton>
        </div>
        <div class="overflow-x-auto -mx-6 -mb-6">
            <table class="w-full table-auto border-collapse text-sm">
                <thead>
                    <tr
                        class="*:border-b *:border-gray-200 *:p-4 *:text-left *:font-medium *:text-gray-400 *:dark:border-gray-600 *:dark:text-gray-200">
                        <th class="!pl-6">Hierarchy of Targeted Results</th>
                        <th>Objectively Verifiable Indicators (OVI)</th>
                        <th>Baseline Data</th>
                        <th>Targets</th>
                        <th>Data Collection Methods</th>
                        <th>Responsibility to Collect Data</th>
                        <th class="!pr-6 w-32">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-50 dark:bg-gray-800/50">
                    <tr v-if="levels.length === 0">
                        <td colspan="7">
                            <div class="flex flex-col justify-center items-center gap-1.5 py-12">
                                <UIcon name="i-lucide-inbox" class="w-12 h-12 text-gray-200 dark:text-gray-700" />
                                <span class="text-gray-400 dark:text-gray-500">No Data Available</span>
                            </div>
                        </td>
                    </tr>

                    <template v-for="(level, lIndex) in levels" :key="'entries-'+lIndex">
                        <tr
                            class="*:border-b *:border-gray-100 *:p-4 *:text-gray-500 *:dark:border-gray-700 *:dark:text-gray-400">
                            <td colspan="6" class="!pl-6">
                                <template v-if="level.editing">
                                    <USelect v-model="level.selectedLevel" :items="levelOptions"
                                        placeholder="Select Priority Level" class="w-3xs" />
                                </template>
                                <template v-else>
                                    {{ level.selectedLevel }}
                                </template>
                            </td>
                            <td class="space-x-1 !pr-6">
                                <UButton :icon="level.editing ? 'i-lucide-save' : 'i-lucide-edit'" color="neutral"
                                    variant="ghost" size="sm" @click="toggleLevelEdit(lIndex)" />
                                <UButton icon="i-heroicons-trash" color="error" variant="ghost" size="sm"
                                    @click="deleteLevelRow(lIndex)" />
                            </td>
                        </tr>
                        <tr v-for="(entry, eIndex) in level.entries" :key="eIndex"
                            class="*:border-b *:border-gray-100 *:p-4 *:text-gray-500 *:dark:border-gray-700 *:dark:text-gray-400">
                            <td class="!pl-6">
                                <template v-if="entry.editing">
                                    <UInput v-model="entry.hierarchy" class="w-full" />
                                </template>
                                <template v-else>
                                    {{ entry.hierarchy }}
                                </template>
                            </td>
                            <td><template v-if="entry.editing">
                                    <UInput v-model="entry.ovi" class="w-full" />
                                </template><template v-else>{{ entry.ovi }}</template></td>
                            <td><template v-if="entry.editing">
                                    <UInput v-model="entry.baseline" class="w-full" />
                                </template><template v-else>{{ entry.baseline }}</template></td>
                            <td><template v-if="entry.editing">
                                    <UInput v-model="entry.targets" class="w-full" />
                                </template><template v-else>{{ entry.targets }}</template></td>
                            <td><template v-if="entry.editing">
                                    <UInput v-model="entry.methods" class="w-full" />
                                </template><template v-else>{{ entry.methods }}</template></td>
                            <td><template v-if="entry.editing">
                                    <UInput v-model="entry.responsibility" class="w-full" />
                                </template><template v-else>{{ entry.responsibility }}</template></td>
                            <td class="space-x-1 !pr-6">
                                <UButton :icon="entry.editing ? 'i-lucide-save' : 'i-lucide-edit'" color="neutral"
                                    variant="ghost" size="sm" @click="toggleEntryEdit(level.entries, eIndex)" />
                                <UButton icon="i-heroicons-trash" color="error" variant="ghost" size="sm"
                                    @click="deleteEntry(level.entries, eIndex)" />
                            </td>
                        </tr>
                        <tr class="*:p-4 *:text-gray-500 *:dark:text-gray-400">
                            <td colspan="7" class="!px-6">
                                <UButton icon="i-heroicons-plus" color="neutral" variant="outline"
                                    @click="addEntryRow(lIndex)">Add Item
                                </UButton>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

type Entry = {
    hierarchy: string
    ovi: string
    baseline: string
    targets: string
    methods: string
    responsibility: string
    editing: boolean
}

type Level = {
    selectedLevel?: string
    editing?: boolean
    entries: Entry[]
}

const levels = reactive<Level[]>([])
function addLevelRow() {
    levels.push({
        selectedLevel: '',
        editing: true,
        entries: []
    })
    showLevelSelect.value = true
}

function deleteLevelRow(index: number) {
    levels.splice(index, 1)
    if (levels.length === 0) {
        showLevelSelect.value = false
    }
}

function addEntryRow(levelIndex: number) {
    levels[levelIndex].entries.push({
        hierarchy: '',
        ovi: '',
        baseline: '',
        targets: '',
        methods: '',
        responsibility: '',
        editing: true,
    })
}

function toggleEntryEdit(entryList: Entry[], index: number) {
    const entry = entryList[index]
    if (!entry) return
    entry.editing = !entry.editing
}

function deleteEntry(entryList: Entry[], index: number) {
    entryList.splice(index, 1)
}

const levelOptions = ref(['Intermediate Outcome', 'Immediate Outcome'])
const showLevelSelect = ref(false)

function toggleLevelEdit(index: number) {
    const level = levels[index]
    if (!level) return
    if (level.editing && level.selectedLevel) {
        // No global selectedLevel variable now, so no assignment here
    }
    level.editing = !level.editing
}
</script>