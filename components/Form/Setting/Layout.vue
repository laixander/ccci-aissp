<template>
    <div class="space-y-6">

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

        <UFormField label="Document Header Template" size="lg">
            <UTextarea :rows="4" placeholder="Enter custom header text for ISSP documents..." class="w-full" />
        </UFormField>

        <UFormField label="Footer Template" size="lg">
            <UTextarea :rows="4" placeholder="Enter custom footer text for ISSP documents..." class="w-full" />
        </UFormField>

    </div>
</template>

<script setup lang="ts">
// Upload Logo Logic
import { ref } from 'vue'

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