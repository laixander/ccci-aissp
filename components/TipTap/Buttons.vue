<template>
    <div v-if="editor" class="flex flex-wrap justify-center gap-2 p-4">
        <!-- Text styles -->
        <UButton icon="i-lucide-bold" variant="soft" size="sm" @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'ring-2 ring-primary': editor.isActive('bold') }" />

        <UButton icon="i-lucide-italic" variant="soft" size="sm" @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'ring-2 ring-primary': editor.isActive('italic') }" />

        <UButton icon="i-lucide-strikethrough" variant="soft" size="sm"
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'ring-2 ring-primary': editor.isActive('strike') }" />

        <UButton icon="i-lucide-code" variant="soft" size="sm" @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ 'ring-2 ring-primary': editor.isActive('code') }" />

        <!-- Clear formatting -->
        <UButton icon="i-lucide-eraser" variant="soft" size="sm"
            @click="editor.chain().focus().unsetAllMarks().run()" />

        <UButton icon="i-lucide-trash-2" variant="soft" size="sm" @click="editor.chain().focus().clearNodes().run()" />

        <!-- Paragraph & Headings -->
        <UButton icon="i-lucide-pilcrow" variant="soft" size="sm" @click="editor.chain().focus().setParagraph().run()"
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

        <!-- Lists -->
        <UButton icon="i-lucide-list" variant="soft" size="sm" @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'ring-2 ring-primary': editor.isActive('bulletList') }" />

        <UButton icon="i-lucide-list-ordered" variant="soft" size="sm"
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'ring-2 ring-primary': editor.isActive('orderedList') }" />

        <!-- Blocks -->
        <UButton icon="i-lucide-terminal-square" variant="soft" size="sm"
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'ring-2 ring-primary': editor.isActive('codeBlock') }" />

        <UButton icon="i-lucide-quote" variant="soft" size="sm" @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'ring-2 ring-primary': editor.isActive('blockquote') }" />

        <!-- Divider & Line break -->
        <UButton icon="i-lucide-minus" variant="soft" size="sm"
            @click="editor.chain().focus().setHorizontalRule().run()" />

        <UButton icon="i-lucide-corner-down-left" variant="soft" size="sm"
            @click="editor.chain().focus().setHardBreak().run()" />

        <!-- History -->
        <UButton icon="i-lucide-undo" variant="soft" size="sm" @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()" />

        <UButton icon="i-lucide-redo" variant="soft" size="sm" @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()" />

        <!-- Custom style: Purple color -->
        <UButton icon="i-lucide-droplet" variant="soft" size="sm"
            @click="editor.chain().focus().setColor('#958DF1').run()"
            :class="{ 'ring-2 ring-primary': editor.isActive('textStyle', { color: '#958DF1' }) }" />
    </div>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'

defineProps<{
    editor: Editor | undefined
}>()
</script>
