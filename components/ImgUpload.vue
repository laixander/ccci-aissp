<template>
    <div>
        <div class="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center space-y-2 cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition bg-white dark:bg-gray-900"
            @click="imgInput?.click()" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop" :class="{ 'border-primary-500 dark:border-primary-400': isDragging }">
            <input ref="imgInput" type="file" accept="image/*" class="hidden" :multiple="multiple" :disabled="disabled"
                @change="onImgChange" />

            <div v-if="imageFiles.length > 0" class="grid gap-4" :class="{ 'lg:grid-cols-2': multiple }">
                <div v-for="(file, index) in imageFiles" :key="file.hash"
                    class="relative border border-gray-300 rounded p-2 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                    <img :src="file.preview" alt="Preview" class="mx-auto h-16 object-contain mb-1 rounded" />
                    <div class="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {{ file.name }}
                    </div>
                    <button v-if="!disabled" class="absolute top-1 right-1 text-gray-400 hover:text-red-500"
                        @click.stop="removeFile(index)">
                        <UIcon name="i-lucide-trash" class="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div v-else>
                <UIcon name="i-lucide-file-image" class="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto" />
                <p class="text-sm text-gray-600 dark:text-gray-300">
                    {{ label }}
                </p>
                <p v-if="multiple" class="text-xs text-gray-400 dark:text-gray-500">
                    Supports bulk image upload
                </p>
                <p v-if="maxSizeMB" class="text-xs text-gray-400 dark:text-gray-500">
                    Max file size: {{ maxSizeMB }}MB
                </p>
                <p v-if="multiple && maxFiles" class="text-xs text-gray-400 dark:text-gray-500">
                    Max files allowed: {{ maxFiles }}
                </p>
            </div>

            <div class="flex justify-center gap-2 mt-2">
                <!-- <UTooltip :text="tooltipText">
          <UButton
            label="Choose File"
            variant="outline"
            color="neutral"
            size="lg"
            :disabled="disabled"
            @click.stop="imgInput?.click()"
          />
        </UTooltip> -->
                <UButton label="Choose File" variant="outline" color="neutral" size="lg" :disabled="disabled"
                    @click.stop="imgInput?.click()" />

                <UButton v-if="multiple && imageFiles.length > 1" icon="i-lucide-trash" color="error"
                    variant="ghost" size="lg" :disabled="disabled" @click.stop="clearAll" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import { useToast } from '#imports'

const props = defineProps<{
    label?: string
    multiple?: boolean
    fileList?: File[]
    maxSizeMB?: number
    maxFiles?: number
    disabled?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:fileList', files: File[]): void
}>()

const imgInput = ref<HTMLInputElement | null>(null)
const imageFiles = ref<{ file: File; name: string; preview: string; hash: string }[]>([])
const isDragging = ref(false)
const showToast = ref(false)
const toast = useToast()

// const tooltipText = computed(() => {
//   if (!props.multiple || !props.maxFiles) return undefined
//   return imageFiles.value.length >= props.maxFiles && !showToast.value
//     ? 'Oldest file will be replaced'
//     : undefined
// })

async function hashFile(file: File): Promise<string> {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function isDuplicate(hash: string) {
    return imageFiles.value.some(f => f.hash === hash)
}

async function handleFiles(selectedFiles: FileList | File[]) {
    const newFiles: { file: File; name: string; preview: string; hash: string }[] = []
    for (const file of Array.from(selectedFiles)) {
        if (!file.type.startsWith('image/')) continue
        if (props.maxSizeMB && file.size > props.maxSizeMB * 1024 * 1024) continue
        const hash = await hashFile(file)
        if (isDuplicate(hash)) continue
        const preview = URL.createObjectURL(file)
        newFiles.push({ file, name: file.name, preview, hash })
    }

    if (!props.multiple) {
        imageFiles.value.forEach(f => URL.revokeObjectURL(f.preview))
        imageFiles.value = newFiles
    } else {
        const max = props.maxFiles || Infinity
        const combined = [...imageFiles.value, ...newFiles]

        while (combined.length > max) {
            const removed = combined.shift()
            if (removed) URL.revokeObjectURL(removed.preview)
            toast.add({ title: 'Max files reached', description: 'Oldest file replaced' })
            showToast.value = true
            setTimeout(() => (showToast.value = false), 2000)
        }

        imageFiles.value = combined
    }

    emit('update:fileList', imageFiles.value.map(f => f.file))
}

function onImgChange(e: Event) {
    if (props.disabled) return
    const files = (e.target as HTMLInputElement).files
    if (!files) return
    handleFiles(files)
    if (imgInput.value) {
        imgInput.value.value = ''
    }
}

function onDrop(e: DragEvent) {
    if (props.disabled || !e.dataTransfer?.files) return
    isDragging.value = false
    handleFiles(e.dataTransfer.files)
}

function removeFile(index: number) {
    if (props.disabled) return
    const removed = imageFiles.value.splice(index, 1)
    if (removed[0]) URL.revokeObjectURL(removed[0].preview)
    emit('update:fileList', imageFiles.value.map(f => f.file))
}

function clearAll() {
    imageFiles.value.forEach(f => URL.revokeObjectURL(f.preview))
    imageFiles.value = []
    emit('update:fileList', [])
}
</script>
