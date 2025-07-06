<template>
    <UCard :ui="uiCardConfig">
        <template #header>
            <UButton icon="i-lucide-bold" :variant="editor?.isActive('bold') ? 'solid' : 'ghost'" size="sm"
                :disabled="!editor?.can().chain().focus().toggleBold().run()"
                @click="editor?.chain().focus().toggleBold().run()" />

            <UButton icon="i-lucide-italic" :variant="editor?.isActive('italic') ? 'solid' : 'ghost'" size="sm"
                :disabled="!editor?.can().chain().focus().toggleItalic().run()"
                @click="editor?.chain().focus().toggleItalic().run()" />

            <UButton icon="i-lucide-strikethrough" :variant="editor?.isActive('strike') ? 'solid' : 'ghost'"
                size="sm" :disabled="!editor?.can().chain().focus().toggleStrike().run()"
                @click="editor?.chain().focus().toggleStrike().run()" />

            <UButton icon="i-lucide-undo-2" size="sm" variant="ghost"
                :disabled="!editor?.can().chain().focus().undo().run()" @click="editor?.chain().focus().undo().run()" />

            <UButton icon="i-lucide-redo-2" size="sm" variant="ghost"
                :disabled="!editor?.can().chain().focus().redo().run()" @click="editor?.chain().focus().redo().run()" />
            <!-- Add more buttons as needed -->
        </template>

        <EditorContent v-if="editor" :editor="editor" />
    </UCard>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const isOpen = defineModel<boolean>({ default: false }) // v-model from parent

const editor = useEditor({
    content: '<p>Hello world!</p>',
    extensions: [StarterKit],
})

const uiCardConfig = {
    header: 'sm:px-4 space-x-2 dark:bg-gray-800/25',
}
</script>

<style scoped>
:deep(.ProseMirror-focused) {
    outline: none !important;
    box-shadow: none !important;
}
</style>