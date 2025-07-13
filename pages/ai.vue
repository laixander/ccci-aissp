<template>
    <Page page-title="AI Assistant" page-description="Intelligent content generation and compliance checking">

        <template #actions>
            <UButton label="Upload PDP/SDS" icon="i-lucide-upload" size="lg" color="neutral" variant="outline"
                class="w-full lg:w-auto justify-center" />
            <UButton label="Generate Content" icon="i-lucide-sparkles" size="lg" color="primary"
                class="w-full lg:w-auto justify-center" />
        </template>

        <template #content>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Block title="Prompt-Based Content Generator" description="Generate ISSP sections using AI assistance"
                    icon="i-lucide-bot" iconColor="text-violet-500 dark:text-violet-700">
                    <template #content>
                        <div class="space-y-4">
                            <UFormField label="Target Section" size="lg" class="w-full">
                                <USelect placeholder="Select Section" class="w-full" />
                            </UFormField>
                            <UFormField label="Organization Context" size="lg" class="w-full">
                                <UInput placeholder="e.g., State University with 15,000 students" class="w-full" />
                            </UFormField>
                            <UFormField label="AI Prompt" size="lg" class="w-full">
                                <UTextarea
                                    placeholder="Describe what you want the AI to generate. For example: 'Create a comprehensive cybersecurity strategy for a university IT infrastructure serving 15,000 students with a focus on cloud migration and data protection.'"
                                    :rows="6" class="w-full" />
                            </UFormField>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <UFormField label="Tone" size="lg">
                                    <USelect placeholder="Select tone" class="w-full" />
                                </UFormField>
                                <UFormField label="Length" size="lg">
                                    <USelect placeholder="Select length" class="w-full" />
                                </UFormField>
                            </div>

                            <UButton label="Generate Content" icon="i-lucide-sparkles" size="lg"
                                class="w-full justify-center" />

                            <UAlert title="AI Tips" color="violet" variant="subtle" :ui="{ title: 'text-md' }">
                                <template #description>
                                    <ul class="list-disc list-inside">
                                        <li>Be specific about your organization type and size</li>
                                        <li>Include relevant technologies and current challenges</li>
                                        <li>Mention compliance requirements (DICT, ISO, etc.)</li>
                                        <li>Specify budget ranges if relevant</li>
                                    </ul>
                                </template>
                            </UAlert>

                        </div>
                    </template>
                </Block>
                <Block title="Document Analysis" description="Upload PDP/SDS for intelligent content extraction"
                    icon="i-lucide-file-text" iconColor="text-blue-500 dark:text-blue-700">
                    <template #content>
                        <div class="space-y-4">
                            <FileUpload icon="i-lucide-upload"
                                instruction="Upload Provincial Development Plan or Strategic Development Plan"
                                :supported-formats="['pdf', 'docx']" :max-file-size-m-b="25" :max-files="2"
                                :multiple="true" button-label="Upload Files" @files-selected="handleSelectedFiles" />
                            <div class="space-y-3">
                                <h4 class="font-medium text-gray-800 dark:text-gray-100">Analysis Features</h4>
                                <div class="grid grid-cols-1 gap-3">
                                    <CardFeature v-for="feature in features" :key="feature.title" v-bind="feature" />
                                </div>
                            </div>
                        </div>
                    </template>
                </Block>
            </div>
            <Block title="AI-Generated Suggestions" description="Smart recommendations to improve your ISSP documents">
                <template #content>
                    <div class="space-y-4">
                        <CardAiSuggestion v-for="item in suggestions" :key="item.title" v-bind="item"
                            :priority="item.priority as 'High' | 'Medium' | 'Low'" @apply="handleApply(item.title)"
                            @dismiss="handleDismiss(item.title)" />
                    </div>
                </template>
            </Block>

            <Block title="DICT/TOR Compliance Checker" description="Validate your ISSP against official guidelines">
                <template #content>
                    <CardCompliance />

                    <div class="mt-6 p-4 bg-elevated/50 rounded-lg">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-medium text-gray-800 dark:text-gray-100">Overall Compliance Score</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Based on DICT ISSP Guidelines 2024
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-2xl font-bold text-gray-800 dark:text-gray-100">76%</p>
                                <p class="text-sm text-yellow-600 dark:text-yellow-300">Needs Improvement</p>
                            </div>
                        </div>
                    </div>
                </template>
            </Block>
        </template>
    </Page>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
})

// File Handling
const handleSelectedFiles = (files: File[]) => {
    console.log('Files selected:', files)
}

const features = [
    {
        icon: 'i-lucide-target',
        title: 'Strategic Alignment',
        description: 'Match your ISSP with provincial priorities',
        color: 'blue',
    },
    {
        icon: 'i-lucide-brain',
        title: 'Content Extraction',
        description: 'Auto-generate relevant sections',
        color: 'green',
    },
    {
        icon: 'i-lucide-shield',
        title: 'Compliance Check',
        description: 'Ensure DICT guideline adherence',
        color: 'purple',
    },
    {
        icon: 'i-lucide-bolt',
        title: 'Smart Automation',
        description: 'Streamline repetitive tasks',
        color: 'amber',
    }
]

const suggestions = [
    {
        title: 'Strategic Objectives Enhancement',
        description: 'Your ISSP could benefit from more specific, measurable objectives aligned with DICT guidelines.',
        category: 'Content Enhancement',
        priority: 'High',
        section: 'Strategic Planning',
        date: '2024-12-01',
    },
    {
        title: 'Visual Consistency Check',
        description: 'Review branding elements to ensure alignment with DICT’s visual identity standards.',
        category: 'Design Review',
        priority: 'Medium',
        section: 'User Interface',
        date: '2024-12-02',
    },
    {
        title: 'Remove Redundant Entries',
        description: 'Some list items are duplicated and should be consolidated.',
        category: 'Data Cleanup',
        priority: 'Low',
        section: 'Appendix',
        date: '2024-12-03',
    },
]

function handleApply(type: string) {
    console.log(`Button clicked for ${type}`)
}

function handleDismiss(type: string) {
    console.log(`Button clicked for ${type}`)
}
</script>