<template>
    <div v-if="editor" class="flex flex-col flex-1 divide-y divide-gray-200 dark:divide-gray-800">
        <TipTapButtons :editor="editor" />

        <div class="bg-gray-50 dark:bg-gray-950 p-4 h-full overflow-y-auto">
            <UCard class="mx-auto w-[720px] min-h-full shadow-lg">
                <div class="editor-content">
                    <EditorContent :editor="editor" />
                </div>
            </UCard>
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