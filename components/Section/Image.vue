<template>
    <div class="p-4 space-y-4 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between">
            <span class="font-semibold text-lg">Images</span>
            <UButton icon="i-lucide-plus" label="Upload Image" color="neutral" size="sm" @click="toggleForm" />
        </div>

        <div v-if="showForm" class="space-y-4">
            <UFileUpload
                layout="grid"
                multiple
                label="Drop your images here"
                description="SVG, PNG, JPG or GIF (max. 2MB)"
                :ui="{
                    base: 'min-h-48'
                }"
            />
            <UButton type="submit" label="Upload" size="lg" block />
        </div>
    </div>

    <div class="overflow-y-auto p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="image in images" :key="image.id"
                class="relative border border-gray-300 rounded-lg pt-4 px-2 pb-2 bg-white dark:border-gray-800 dark:bg-gray-900">
                <img :src="image.src" alt="Preview" class="mx-auto h-16 object-contain mb-1 rounded" />
                <div class="text-xs text-gray-500 dark:text-gray-400 text-center truncate">
                    {{ image.name }}
                </div>
                <button class="absolute top-1 right-1 text-gray-400 hover:text-red-500" @click="deleteImage(image.id)">
                    <UIcon name="i-lucide-trash" class="size-4 shrink-0" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const showForm = ref(false)

const toggleForm = () => {
    showForm.value = !showForm.value
}

const uiCardConfig = {
    body: 'sm:p-4 flex flex-col items-start gap-2'
}

import { ref } from 'vue'

const images = ref([
    { id: 1, src: 'https://picsum.photos/300/200.webp?random=1', name: 'Image 1' },
    { id: 2, src: 'https://picsum.photos/300/200.webp?random=2', name: 'Image 2' },
    { id: 3, src: 'https://picsum.photos/300/200.webp?random=3', name: 'Image 3' },
])

// function deleteImage(id: number) {
//     images.value = images.value.filter(image => image.id !== id)
// }
</script>