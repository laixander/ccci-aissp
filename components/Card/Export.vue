<template>
    <!-- Main container for a single file item -->
    <UCard :class="uiCardConfig" class="hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
            <!-- File icon -->
            <!-- UIcon typically handles dark mode automatically if configured with NuxtUI -->
            <UIcon :name="fileIcon" class="w-8 h-8 text-gray-600 dark:text-gray-300" />

            <!-- File details grid -->
            <div class="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <!-- File name and description -->
                <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100 truncate">{{ file.name }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ file.description }}</p>
                </div>

                <!-- File type badge -->
                <div class="text-center">
                    <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
                        :class="fileTypeColorClass">
                        {{ file.type.toUpperCase() }}
                    </div>
                </div>

                <!-- Author and date -->
                <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ file.author }}</p>
                    <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <UIcon name="i-lucide-calendar" class="w-3 h-3" />
                        <span>{{ file.date }}</span>
                    </div>
                </div>

                <!-- File size and downloads -->
                <div class="text-center">
                    <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ file.size }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ file.downloads }} downloads</p>
                </div>

                <!-- Status badge -->
                <div class="text-center">
                    <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent"
                        :class="statusCodeClass">
                        {{ file.status }}
                    </div>
                </div>
            </div>

            <!-- Action buttons -->
            <!-- UButton components handle dark mode automatically -->
            <div class="flex gap-2">
                <UButton icon="i-lucide-eye" variant="ghost" color="neutral" size="sm" aria-label="View"
                    @click="emit('view', file.id)" />
                <UButton icon="i-lucide-download" variant="ghost" color="neutral" size="sm" aria-label="Download"
                    @click="emit('download', file.id)" />
                <UButton icon="i-lucide-trash-2" variant="ghost" color="error" size="sm" aria-label="Delete"
                    @click="emit('delete', file.id)" />
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const uiCardConfig = {
    body: 'sm:p-4'
}

// Define the interface for the file object to ensure type safety.
interface FileItem {
    id: string;
    name: string;
    description: string;
    type: string;
    author: string;
    date: string;
    size: string;
    downloads: number;
    status: string;
}

// Define the props that this component will accept.
// The 'file' prop is typed as FileItem.
const props = defineProps<{
    file: FileItem;
}>();

// Define the custom events that this component can emit.
// The events 'view', 'download', and 'delete' all emit a string (the file ID).
const emit = defineEmits<{
    (e: 'view', id: string): void;
    (e: 'download', id: string): void;
    (e: 'delete', id: string): void;
}>();

// Computed property to determine the icon based on file type.
const fileIcon = computed(() => {
    switch (props.file.type.toLowerCase()) {
        case 'pdf':
        case 'docx':
            return 'i-lucide-file-text';
        case 'xlsx':
            return 'i-lucide-file-spreadsheet';
        case 'pptx':
            return 'i-lucide-file-presentation';
        case 'zip':
            return 'i-lucide-file-archive';
        default:
            return 'i-lucide-file';
    }
});

// Computed property to determine the Tailwind CSS classes for the file type badge.
const fileTypeColorClass = computed(() => {
    switch (props.file.type.toLowerCase()) {
        case 'pdf':
            // Added dark mode classes for PDF badge
            return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
        case 'docx':
            // Added dark mode classes for DOCX badge
            return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
        case 'xlsx':
            // Added dark mode classes for XLSX badge
            return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
        default:
            // Added dark mode classes for default badge
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
});

// Computed property to determine the Tailwind CSS classes for the status badge.
const statusCodeClass = computed(() => {
    switch (props.file.status.toLowerCase()) {
        case 'completed':
            // Added dark mode classes for Completed status badge
            return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
        case 'processing':
            // Added dark mode classes for Processing status badge
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
        case 'failed':
            // Added dark mode classes for Failed status badge
            return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
        default:
            // Added dark mode classes for default status badge
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
});
</script>