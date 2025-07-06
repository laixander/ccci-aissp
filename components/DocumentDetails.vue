<template>
    <Block title="Document Details" description="Set up the core information and branding for your ISSP template."
        class="w-full lg:w-[768px]">
        <template #content>
            <div class="space-y-4">
                <UFormField label="Template Name" size="lg" required>
                    <UInput placeholder="e.g., Standard ISSP Template" class="w-full" />
                </UFormField>
                <UFormField label="Description" size="lg">
                    <UTextarea :rows="3" placeholder="Brief description of the strategic plan scope and objectives..."
                        class="w-full" />
                </UFormField>

                <!-- Custom Logo Upload -->
                <UFormField label="University Logo">
                    <ImgUpload label="Upload logo" v-model:fileList="logoImage" :multiple="false" :maxSizeMB="2" />
                </UFormField>

                <!-- Custom Color Picker -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField label="Primary Color">
                        <div class="flex items-center gap-2">
                            <UPopover :content="{ align: 'start', side: 'bottom' }">
                                <div class="shrink-0 w-9 h-9 rounded-md" :style="primaryChip"></div>
                                <template #content>
                                    <UColorPicker v-model="primaryColor" class="p-2" />
                                </template>
                            </UPopover>
                            <UInput v-model="primaryColor" size="lg" class="w-full" />
                        </div>
                    </UFormField>
                    <UFormField label="Secondary Color">
                        <div class="flex items-center gap-2">
                            <UPopover :content="{ align: 'start', side: 'bottom' }">
                                <div class="shrink-0 w-9 h-9 rounded-md" :style="secondaryChip"></div>
                                <template #content>
                                    <UColorPicker v-model="secondaryColor" class="p-2" />
                                </template>
                            </UPopover>
                            <UInput v-model="secondaryColor" size="lg" class="w-full" />
                        </div>
                    </UFormField>
                </div>

                <UFormField label="Document Header" size="lg">
                    <UTextarea :rows="3" placeholder="Enter custom header text for ISSP documents..." class="w-full" />
                </UFormField>

                <UFormField label="Document Footer" size="lg">
                    <UTextarea :rows="3" placeholder="Enter custom footer text for ISSP documents..." class="w-full" />
                </UFormField>
            </div>
        </template>
    </Block>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Custom Logo Upload
const logoImage = ref<File[]>([])

// Custom Color Picker
const primaryColor = ref('#0284c7')
const secondaryColor = ref('#374151')
const primaryChip = computed(() => ({ backgroundColor: primaryColor.value }))
const secondaryChip = computed(() => ({ backgroundColor: secondaryColor.value }))
</script>