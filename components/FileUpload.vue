<template>
    <div class="border-2 border-dashed rounded-lg p-6 text-center transition-colors" :class="{
        'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900': !isDragging,
        'border-blue-500 bg-blue-50 dark:bg-blue-900/20': isDragging,
    }" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
        <!-- Icon -->
        <UIcon :name="icon" class="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2 mx-auto" />

        <!-- Instruction -->
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">{{ instruction }}</p>

        <!-- Format & Size Info -->
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Supported: {{ supportedFormats.join(', ').toUpperCase() }} | Max: {{ maxFileSizeMB }}MB{{ multiple ? ' each'
            : '' }}
        </p>

        <!-- Hidden file input -->
        <UInput type="file" :multiple="multiple" :accept="acceptString" class="hidden" ref="fileInput"
            @change="onFileChange" />

        <!-- Upload Button -->
        <UButton :label="buttonLabel" variant="outline" color="neutral" @click="triggerFileInput" />

        <!-- File Count -->
        <p v-if="multiple" class="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Selected {{ files.length }} / {{ maxFiles }} file{{ maxFiles > 1 ? 's' : '' }}
        </p>

        <!-- File Preview -->
        <ul v-if="files.length" class="mt-4 space-y-2 text-left text-sm">
            <li v-for="(file, index) in files" :key="index"
                class="flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-800 p-2 pl-4 rounded">
                <span class="truncate text-gray-700 dark:text-gray-200">
                    {{ file.name }} ({{ formatBytes(file.size) }})
                </span>
                <UButton icon="i-lucide-trash" variant="ghost" color="error" @click="removeFile(index)" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    icon?: string
    instruction?: string
    supportedFormats?: string[]
    maxFileSizeMB?: number
    buttonLabel?: string
    multiple?: boolean
    maxFiles?: number
}>()

const emit = defineEmits<{
    (e: 'files-selected', files: File[]): void
}>()

const toast = useToast()

const icon = props.icon ?? 'i-lucide-upload'
const instruction = props.instruction ?? 'Upload your file(s)'
const supportedFormats = props.supportedFormats ?? ['pdf', 'docx']
const maxFileSizeMB = props.maxFileSizeMB ?? 25
const buttonLabel = props.buttonLabel ?? 'Choose File'
const multiple = props.multiple ?? false
const maxFiles = props.maxFiles ?? 10 // Default to 10 if not set

const acceptString = computed(() =>
    supportedFormats.map(ext => `.${ext.toLowerCase()}`).join(',')
)

const fileInput = ref<HTMLInputElement>()
const files = ref<File[]>([])
const isDragging = ref(false)

const triggerFileInput = () => {
    fileInput.value?.click()
}

const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const addFiles = (newFiles: FileList | File[]) => {
    const maxBytes = maxFileSizeMB * 1024 * 1024

    const isDuplicate = (file: File) =>
        files.value.some(f => f.name === file.name && f.size === file.size)

    const incoming = Array.from(newFiles)

    const remainingSlots = multiple ? maxFiles - files.value.length : 1
    if (multiple && incoming.length > remainingSlots) {
        toast.add({
            title: 'Too Many Files',
            description: `You can only select ${maxFiles} file${maxFiles > 1 ? 's' : ''} in total.`,
            icon: 'i-lucide-folder-minus',
            color: 'warning'
        })
        return
    }

    const validFiles: File[] = []

    for (const file of incoming) {
        const ext = file.name.split('.').pop()?.toLowerCase()
        const isValidExt = ext && supportedFormats.includes(ext)
        const isValidSize = file.size <= maxBytes

        if (!isValidExt) {
            toast.add({
                title: 'Invalid File Format',
                description: `${file.name} is not a supported format.`,
                icon: 'i-lucide-alert-triangle',
                color: 'error'
            })
            continue
        }

        if (!isValidSize) {
            toast.add({
                title: 'File Too Large',
                description: `${file.name} exceeds ${maxFileSizeMB}MB.`,
                icon: 'i-lucide-file-x',
                color: 'error'
            })
            continue
        }

        if (isDuplicate(file)) {
            toast.add({
                title: 'Duplicate File',
                description: `${file.name} is already selected.`,
                icon: 'i-lucide-copy',
                color: 'warning'
            })
            continue
        }

        validFiles.push(file)

        // If we hit the limit, stop early
        if (validFiles.length >= remainingSlots) break
    }

    if (!validFiles.length) return

    if (multiple) {
        files.value.push(...validFiles)
    } else {
        files.value = [validFiles[0]]
    }

    emit('files-selected', files.value)
}

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files) return
    addFiles(target.files)
    target.value = ''
}

const removeFile = (index: number) => {
    files.value.splice(index, 1)
    emit('files-selected', files.value)
}

const onDragOver = () => {
    isDragging.value = true
}

const onDragLeave = () => {
    isDragging.value = false
}

const onDrop = (e: DragEvent) => {
    isDragging.value = false
    if (e.dataTransfer?.files) {
        addFiles(e.dataTransfer.files)
    }
}
</script>