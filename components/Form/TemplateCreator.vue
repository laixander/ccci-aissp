<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <UFormField label="Template Name" size="lg" required>
                <UInput v-model="templateName" placeholder="e.g., Standard ISSP Template" class="w-full" />
            </UFormField>
            <UFormField label="Description" size="lg">
                <UTextarea v-model="templateDescription" :rows="3"
                    placeholder="Brief description of the strategic plan scope and objectives..." class="w-full" />
            </UFormField>



            <!-- Upload Logo -->
            <UFormField label="University Logo" size="lg">
                <div
                    class="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center space-y-2 cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition bg-white dark:bg-gray-900"
                    @click="logoInput?.click()"
                >
                    <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="onLogoChange" />
                    <div v-if="logoPreview">
                        <img :src="logoPreview" alt="Logo Preview" class="mx-auto h-16 object-contain mb-2" />
                    </div>
                    <div v-if="logoName" class="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">{{ logoName }}
                    </div>
                    <UIcon v-else name="i-lucide-building" class="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto" />
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                        <span v-if="!logoPreview">Upload university logo</span>
                        <span v-else>Change logo</span>
                    </p>
                    <UButton label="Choose File" variant="outline" color="neutral" size="lg"
                        @click.stop="logoInput?.click()" />
                </div>
            </UFormField>

            <!-- Color Customization -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField label="Primary Color">
                    <div class="flex items-center gap-2">
                        <UPopover :content="{
                            align: 'start',
                            side: 'bottom'
                        }">
                            <div class="w-9 h-9 rounded-md" :style="primaryChip"></div>
                            <template #content>
                                <UColorPicker v-model="primaryColor" class="p-2" />
                            </template>
                        </UPopover>
                        <UInput v-model="primaryColor" size="lg" class="w-full" />
                    </div>
                </UFormField>
                <UFormField label="Secondary Color">
                    <div class="flex items-center gap-2">
                        <UPopover :content="{
                            align: 'start',
                            side: 'bottom'
                        }">
                            <div class="w-9 h-9 rounded-md" :style="secondaryChip"></div>
                            <template #content>
                                <UColorPicker v-model="secondaryColor" class="p-2" />
                            </template>
                        </UPopover>
                        <UInput v-model="secondaryColor" size="lg" class="w-full" />
                    </div>
                </UFormField>
            </div>

            <UFormField label="Document Header" size="lg">
                <UTextarea v-model="templateHeader" :rows="3" placeholder="Enter custom header text for ISSP documents..." class="w-full" />
            </UFormField>

            <UFormField label="Document Footer" size="lg">
                <UTextarea v-model="templateFooter" :rows="3" placeholder="Enter custom footer text for ISSP documents..." class="w-full" />
            </UFormField>




        </div>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold">Document Sections</h3>
                <UButton label="Create Section" icon="i-lucide-plus" color="neutral" size="lg"
                    @click="openCreateModal" />
            </div>
            <!-- Modal for Create/Edit Section -->
            <UModal v-model:open="modalOpen" :title="isEditing ? 'Edit Section' : 'Create Section'"
                :description="isEditing ? 'Edit this section of your ISSP document template' : 'Add a new section to your ISSP document template'"
                :ui="uiModalConfig">
                <template #body>
                    <div class="space-y-4">
                        <UInput v-model="sectionTitle" placeholder="Section Title" size="lg" class="w-full" />
                        <UTextarea v-model="sectionDesc" :rows="4" placeholder="Section description or purpose..."
                            size="lg" class="w-full" />
                        <USelect v-model="sectionType" :items="items" value-key="value" :icon="icon" size="lg"
                            class="w-full" />
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <UButton color="neutral" label="Cancel" size="lg" variant="outline" class="w-full justify-center" 
                                @click="modalOpen = false" />
                            <UButton :label="isEditing ? 'Save Changes' : 'Add Section'" icon="i-lucide-plus"
                                color="primary" size="lg" class="w-full justify-center" :disabled="!sectionTitle"
                                @click="isEditing ? saveEditSection() : addSection()" />
                        </div>
                    </div>
                </template>
            </UModal>
            <div class="space-y-4 bg-gray-50 dark:bg-gray-800/25 rounded-md p-4">
                <div v-if="sections.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
                    <UIcon name="i-lucide-file-text" class="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
                    <p class="text-sm">No sections added yet. Click "Create Section" to get started.</p>
                </div>
                <!-- Created Sections -->
                <div v-for="(section, idx) in sections" :key="idx"
                    class="flex items-center bg-white dark:bg-gray-700/50 rounded shadow p-4 relative">
                    <!-- Card Ink -->
                    <div class="absolute left-0 top-0 h-full w-2 rounded-l" :class="typeColors[section.type]?.ink">
                    </div>
                    <div class="flex-1 flex items-center gap-3 pl-2">
                        <UIcon :name="section.icon" class="w-6 h-6 text-gray-400 dark:text-gray-300" />
                        <div>
                            <h4 class="font-semibold text-gray-800 dark:text-gray-100">{{ section.title }}</h4>
                            <p class="text-gray-500 dark:text-gray-400 text-sm">{{ section.desc }}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 ml-4">
                        <div class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                            :class="typeColors[section.type]?.badge">
                            {{ section.typeLabel }}
                        </div>

                        <!-- Move Up -->
                        <UButton icon="i-lucide-arrow-up" color="neutral" variant="ghost" size="sm" aria-label="Move Up"
                            :disabled="idx === 0" @click="moveSectionUp(idx)" />
                        <!-- Move Down -->
                        <UButton icon="i-lucide-arrow-down" color="neutral" variant="ghost" size="sm"
                            aria-label="Move Down" :disabled="idx === sections.length - 1"
                            @click="moveSectionDown(idx)" />
                        <!-- Badge -->
                        <UButton icon="i-lucide-edit" color="neutral" variant="ghost" size="sm" aria-label="Edit"
                            @click="editSection(idx)" />
                        <UButton icon="i-lucide-trash" color="error" variant="ghost" size="sm" aria-label="Delete"
                            @click="removeSection(idx)" />
                    </div>
                </div>
            </div>
        </div>

        <div class="flex gap-2 w-full justify-end">
            <UButton color="neutral" label="Cancel" size="lg" variant="outline" @click="emit('cancel')" />
            <UButton color="primary" :label="isEditMode ? 'Save' : 'Create Template'" size="lg" :disabled="!templateName || !sections.length"
                @click="createTemplate" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SelectItem } from '@nuxt/ui'

const modalOpen = ref(false)
const isEditing = ref(false)
const editIndex = ref(-1)

const sectionTitle = ref('')
const sectionDesc = ref('')
const sectionType = ref('text_content')

const templateName = ref('')
const templateDescription = ref('')

const templateHeader = ref('')
const templateFooter = ref('')

const items = ref([
    { label: 'Text Content', value: 'text_content', icon: 'i-lucide-file-text' },
    { label: 'Image Upload', value: 'image_upload', icon: 'i-lucide-image' },
    { label: 'Data Table', value: 'data_table', icon: 'i-lucide-table' },
    { label: 'Custom Component', value: 'custom_component', icon: 'i-lucide-component' }
] satisfies SelectItem[])

const typeColors = {
    text_content: {
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
        ink: 'bg-blue-600'
    },
    image_upload: {
        badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        ink: 'bg-green-600'
    },
    data_table: {
        badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
        ink: 'bg-yellow-500'
    },
    custom_component: {
        badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
        ink: 'bg-purple-600'
    }
}

const icon = computed(() => items.value.find(item => item.value === sectionType.value)?.icon)

const sections = ref<Array<{ title: string; desc: string; type: string; typeLabel: string; icon: string }>>([])

function openCreateModal() {
    isEditing.value = false
    sectionTitle.value = ''
    sectionDesc.value = ''
    sectionType.value = items.value[0]?.value ?? ''
    modalOpen.value = true
}

function addSection() {
    const typeObj = items.value.find(item => item.value === sectionType.value)
    sections.value.push({
        title: sectionTitle.value,
        desc: sectionDesc.value,
        type: sectionType.value,
        typeLabel: typeObj?.label || '',
        icon: typeObj?.icon || 'i-lucide-file-text'
    })
    sectionTitle.value = ''
    sectionDesc.value = ''
    sectionType.value = items.value[0]?.value ?? ''
    modalOpen.value = false
}

function editSection(idx: number) {
    const section = sections.value[idx]
    if (!section) return
    isEditing.value = true
    editIndex.value = idx
    sectionTitle.value = section.title
    sectionDesc.value = section.desc
    sectionType.value = section.type
    modalOpen.value = true
}

function saveEditSection() {
    if (editIndex.value !== -1) {
        const typeObj = items.value.find(item => item.value === sectionType.value)
        sections.value[editIndex.value] = {
            title: sectionTitle.value,
            desc: sectionDesc.value,
            type: sectionType.value,
            typeLabel: typeObj?.label || '',
            icon: typeObj?.icon || 'i-lucide-file-text'
        }
        editIndex.value = -1
        isEditing.value = false
        sectionTitle.value = ''
        sectionDesc.value = ''
        sectionType.value = items.value[0]?.value ?? ''
        modalOpen.value = false
    }
}

function removeSection(idx: number) {
    sections.value.splice(idx, 1)
}

function moveSectionUp(idx: number) {
    if (idx > 0) {
        const arr = sections.value
        const prev = arr[idx - 1]
        const current = arr[idx]
        if (prev !== undefined && current !== undefined) {
            arr.splice(idx - 1, 2, current, prev)
        }
    }
}

function moveSectionDown(idx: number) {
    if (idx < sections.value.length - 1) {
        const arr = sections.value
        const next = arr[idx + 1]
        const current = arr[idx]
        if (next !== undefined && current !== undefined) {
            arr.splice(idx, 2, next, current)
        }
    }
}

const uiModalConfig = {
    content: 'divide-y-0',
    header: 'sm:p-6 space-y-1.5 items-center',
    body: 'pt-0 sm:pt-0',
}

const emit = defineEmits(['create'])

function createTemplate() {
    // Gather template data (e.g., name, description, sections)
    const template = {
        name: templateName.value,
        description: templateDescription.value,
        sections: sections.value,
        logo: logoPreview.value,
        primaryColor: primaryColor.value,
        secondaryColor: secondaryColor.value,
        header: templateHeader.value,
        footer: templateFooter.value
    }
    emit('create', template)
    // Optionally reset fields here
}

const props = defineProps<{
  template?: {
    name: string
    description: string
    sections: Array<any>
    header?: string
    footer?: string
  } | null
}>()

watch(
  () => props.template,
  (tpl) => {
    if (tpl) {
      templateName.value = tpl.name
      templateDescription.value = tpl.description
      sections.value = JSON.parse(JSON.stringify(tpl.sections || []))
      // Optionally set isEditing.value = true if you want to change button label
      templateHeader.value = tpl.header || ''
      templateFooter.value = tpl.footer || ''
    } else {
      templateName.value = ''
      templateDescription.value = ''
      sections.value = []
      templateHeader.value = ''
      templateFooter.value = ''
    }
  },
  { immediate: true }
)

const isEditMode = computed(() => !!props.template)






// Upload Logo Logic
const logoInput = ref<HTMLInputElement | null>(null)
const logoPreview = ref<string | null>(null)
const logoName = ref<string | null>(null)

function onLogoChange(e: Event) {
    const files = (e.target as HTMLInputElement).files
    if (files && files[0]) {
        logoName.value = files[0].name
        const reader = new FileReader()
        reader.onload = (ev) => {
            logoPreview.value = ev.target?.result as string
        }
        reader.readAsDataURL(files[0])
    }
}

// Color Customization Logic
const primaryColor = ref('#0284c7')
const primaryChip = computed(() => ({ backgroundColor: primaryColor.value }))

const secondaryColor = ref('#374151')
const secondaryChip = computed(() => ({ backgroundColor: secondaryColor.value }))
</script>