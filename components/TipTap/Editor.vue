<template>
    <div class="flex h-full divide-x divide-gray-200 dark:divide-gray-800">
        <div v-if="editor" class="flex flex-col flex-1 divide-y divide-gray-200 dark:divide-gray-800">
            <TipTapButtons :editor="editor" />

            <div class="relative bg-gray-50 dark:bg-gray-950 p-4 h-full overflow-y-auto">
                <UCard class="mx-auto w-[720px] min-h-full shadow-lg">
                    <div class="editor-content">
                        <EditorContent :editor="editor" />
                    </div>
                </UCard>
                <div class="absolute top-4 right-4 grid gap-2">
                    <UTooltip text="Save as Draft" arrow :content="{ align: 'center', side: 'left', sideOffset: 8 }">
                        <UButton icon="i-lucide-save" color="success" size="lg" class="rounded-full" />
                    </UTooltip>
                    <UTooltip text="Generate" arrow :content="{ align: 'center', side: 'left', sideOffset: 8 }">
                        <UButton icon="i-lucide-file-cog" color="warning" size="lg" class="rounded-full" />
                    </UTooltip>
                    <UTooltip text="Close" arrow :content="{ align: 'center', side: 'left', sideOffset: 8 }">
                        <UButton icon="i-lucide-x" color="neutral" variant="soft" size="lg" class="rounded-full" @click="handleClick" />
                    </UTooltip>
                </div>
            </div>
        </div>
        <div v-if="showDetails" class="w-md h-full p-4 overflow-y-auto">
            <TipTapDetails />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Placeholder } from '@tiptap/extensions'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import { ListItem } from '@tiptap/extension-list'

const props = defineProps<{
  showDetails: boolean
}>()

const emit = defineEmits(['close'])

function handleClick() {
  emit('close') // tell the parent the button was clicked
}

const editor = ref<Editor>()

onMounted(() => {
    editor.value = new Editor({
        extensions: [
            StarterKit,
            TextStyle,
            ListItem,
            Color.configure({ types: ['textStyle', 'listItem'] }),
            Placeholder.configure({
                placeholder: 'Start typing your ISSP document here...',
            }),
        ],
        content: '',
    })
})

onBeforeUnmount(() => {
    editor.value?.destroy()
})
</script>