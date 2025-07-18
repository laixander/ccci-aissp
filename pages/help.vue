<template>
    <Page page-title="Help Page" page-description="A quick guide for developers on building pages and UI components">
        <template #content>
            <Block title="Wrapper" description="Wraps content in a consistent layout structure." icon="i-lucide-box" icon-color="text-primary">
                <template #content>
                    <ul class="text-sm text-toned space-y-1.5">
                        <li><UBadge label="Page" color="neutral" variant="outline" /> - Wraps and structures the main content of a page.</li>
                        <li><UBadge label="Block" color="neutral" variant="outline" /> - Defines modular sections inside a Page component.</li>
                        <li><UBadge label="CardRow" color="neutral" variant="outline" /> - A layout alternative to table rows, using card-based presentation.</li>
                        <li><UBadge label="DynamicGrid" color="neutral" variant="outline" /> - Handles content layout using a flexible, responsive grid system.</li>
                    </ul>
                </template>
            </Block>
            <Block title="Custom Components" description="A set of reusable UI elements and visual components" icon="i-lucide-component" icon-color="text-primary">
                <template #content>
                    <ul class="text-sm text-toned space-y-1.5">
                        <li><UBadge label="IconActions" color="neutral" variant="outline" /> - A compact set of icon-based action buttons, commonly used in cards or lists.</li>
                        <li><UBadge label="ImgUpload" color="neutral" variant="outline" /> - An image uploader with rich configuration options, preview support, and validations.</li>
                        <li><UBadge label="FileUpload" color="neutral" variant="outline" /> - A robust uploader for various file types, featuring customizable settings and validations.</li>
                        <li><UBadge label="BaseProgress" color="neutral" variant="outline" /> - A visually flexible progress indicator for loading states or task tracking.</li>
                        <li><UBadge label="CardFeature" color="neutral" variant="outline" /> -  A visually engaging card component ideal for feature highlights, marketing sections, or aesthetic lists.</li>
                        <li><UBadge label="ColorPicker" color="neutral" variant="outline" /> - A flexible UI component that allows users to select and input colors via a responsive interface.</li>
                    </ul>
                </template>
            </Block>
            <Block title="Placeholder" description="Temporary content for layout, development, or data previews." icon="i-lucide-construction" icon-color="text-primary">
                <template #content>
                    <ul class="text-sm text-toned space-y-1.5">
                        <li><UBadge label="ComingSoon" color="neutral" variant="outline" /> - Displays placeholder content for features that are not yet available.</li>
                        <li><UBadge label="EmptyState" color="neutral" variant="outline" /> - A UI component to indicate empty or missing data with optional guidance or call to action.</li>
                        <li><UBadge label="Placeholder" color="neutral" variant="outline" /> - A block of pattern used to represent empty content.</li>
                    </ul>
                </template>
            </Block>
        </template>
    </Page>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
})
</script>