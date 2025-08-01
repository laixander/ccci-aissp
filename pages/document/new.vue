<template>
    <Page page-title="ISSP Document Management"
        page-description="Create, review, and manage Information Systems Strategic Plans">
        <template #actions>
            <UButton label="Bulk Report" icon="i-lucide-download" size="lg" color="neutral" variant="outline"
                class="w-full lg:w-auto justify-center" />
            <UButton label="New ISSP Document" icon="i-lucide-file-text" size="lg"
                class="w-full lg:w-auto justify-center" to="/document/new" />
        </template>

        <template #content>
            <div v-if="editor">
                <div class="flex flex-wrap gap-2 mb-4">
                    <UButton icon="i-lucide-bold" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleBold().run()"
                        :disabled="!editor.can().chain().focus().toggleBold().run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('bold') }" />

                    <UButton icon="i-lucide-italic" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleItalic().run()"
                        :disabled="!editor.can().chain().focus().toggleItalic().run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('italic') }" />

                    <UButton icon="i-lucide-strikethrough" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleStrike().run()"
                        :disabled="!editor.can().chain().focus().toggleStrike().run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('strike') }" />

                    <UButton icon="i-lucide-code" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleCode().run()"
                        :disabled="!editor.can().chain().focus().toggleCode().run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('code') }" />

                    <UButton icon="i-lucide-eraser" variant="soft" size="sm"
                        @click="editor.chain().focus().unsetAllMarks().run()" />

                    <UButton icon="i-lucide-trash" variant="soft" size="sm"
                        @click="editor.chain().focus().clearNodes().run()" />

                    <UButton icon="i-lucide-pilcrow" variant="soft" size="sm"
                        @click="editor.chain().focus().setParagraph().run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('paragraph') }" />

                    <UButton icon="i-lucide-heading-1" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('heading', { level: 1 }) }" />

                    <UButton icon="i-lucide-heading-2" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('heading', { level: 2 }) }" />

                    <UButton icon="i-lucide-heading-3" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('heading', { level: 3 }) }" />

                    <UButton icon="i-lucide-heading-4" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('heading', { level: 4 }) }" />

                    <UButton icon="i-lucide-list" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleBulletList().run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('bulletList') }" />

                    <UButton icon="i-lucide-list-ordered" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleOrderedList().run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('orderedList') }" />

                    <UButton icon="i-lucide-terminal-square" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleCodeBlock().run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('codeBlock') }" />

                    <UButton icon="i-lucide-quote" variant="soft" size="sm"
                        @click="editor.chain().focus().toggleBlockquote().run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('blockquote') }" />

                    <UButton icon="i-lucide-minus" variant="soft" size="sm"
                        @click="editor.chain().focus().setHorizontalRule().run()" />

                    <UButton icon="i-lucide-corner-down-left" variant="soft" size="sm"
                        @click="editor.chain().focus().setHardBreak().run()" />

                    <UButton icon="i-lucide-undo" variant="soft" size="sm" @click="editor.chain().focus().undo().run()"
                        :disabled="!editor.can().chain().focus().undo().run()" />

                    <UButton icon="i-lucide-redo" variant="soft" size="sm" @click="editor.chain().focus().redo().run()"
                        :disabled="!editor.can().chain().focus().redo().run()" />

                    <UButton icon="i-lucide-droplet" variant="soft" size="sm"
                        @click="editor.chain().focus().setColor('#958DF1').run()"
                        :class="{ 'ring-2 ring-primary': editor.isActive('textStyle', { color: '#958DF1' }) }" />
                </div>

                <UCard>
                    <div class="prose prose-neutral dark:prose-invert max-w-none">
                        <editor-content :editor="editor" />
                    </div>
                </UCard>
            </div>
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    auth: false
})

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ListItem } from '@tiptap/extension-list'
import { Color, TextStyle } from '@tiptap/extension-text-style'

const editor = ref<Editor>()

onMounted(() => {
    editor.value = new Editor({
        extensions: [
            StarterKit,
            TextStyle,
            ListItem,
            Color.configure({ types: ['textStyle', 'listItem'] }) // valid usage
        ],
        content: '',
    })
})

onBeforeUnmount(() => {
    editor.value?.destroy()
})
</script>
