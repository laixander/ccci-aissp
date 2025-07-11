<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <UForm :state="state" class="space-y-2">
                <div class="grid lg:flex gap-4">
                    <UFormField class="w-full" label="AI Provider" help="Select your preferred AI platform." size="lg">
                        <USelect v-model="selectedProvider" placeholder="Select ai provider" :items="providers"
                            class="w-full" />
                    </UFormField>
                    <UFormField class="w-full" label="Model Version" help="Choose the specific model version to use."
                        size="lg">
                        <USelect :disabled="modelsDisabled" placeholder="Select a model version" :items="models"
                            class="w-full" />
                    </UFormField>
                </div>


                <UFormField class="w-full" label="API Endpoint (URL)" help="Enter the API URL for the selected AI."
                    size="lg">
                    <UInput class="w-full" placeholder="e.g. https://api.openai.com/v1/chat/completions" />
                </UFormField>

                <div class="grid lg:flex gap-4">
                    <UFormField class="w-full" label="Access Key" help="Your public API access key." size="lg">
                        <UInput class="w-full" placeholder="e.g. sk-xxxxxx" />
                    </UFormField>
                    <UFormField class="w-full" label="Secret Key"
                        help="Your public API access key.Your private API secret key (kept securely)." size="lg">
                        <UInput class="w-full" placeholder="e.g. secret-xxxxxx" />
                    </UFormField>
                </div>

                <UFormField label="Initial Prompt Template"
                    help="Define a default instruction or context prompt for the AI to use on initialization.">
                    <UTextarea :rows="4"
                        placeholder="e.g. You are an assistant that provides concise and helpful responses."
                        class="w-full" />
                </UFormField>
            </UForm>

            <div class="grid lg:flex lg:justify-between items-center gap-2">
                <!-- Slideover -->
                <USlideover v-model:open="open" title="Test AI Prompt" :ui="{ body: 'p-0 sm:p-0' }">
                    <UButton label="Test Prompt" icon="i-lucide-monitor-cog" variant="outline" size="lg"
                        class="w-full justify-center lg:w-auto" />
                    <template #body>

                        <!-- Simulate AI Greetings -->
                        <div v-if="!showAiGreeting" class="grid gap-2 p-6">
                            <USkeleton class="h-4 w-full" />
                            <USkeleton class="h-4 w-full" />
                            <USkeleton class="h-4 w-2/3" />
                        </div>
                        <div v-else class="space-y-2 p-6 overflow-auto">
                            <p class="text-sm text-gray-700 dark:text-gray-300">👋 Hello, this is a <strong>test
                                    prompt</strong> for the AI
                                configuration. You can enter your test prompt here and see how the AI responds.</p>
                        </div>

                        <!-- Simulate User Prompt Message Balloon -->
                        <div v-if="userPrompt" class="px-6">
                            <div class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 p-4 rounded-lg">
                                <p class="text-sm">{{ userPrompt }}</p>
                            </div>
                        </div>


                        <!-- Simulate AI Response -->
                        <div v-if="userPrompt">
                            <div v-if="!showAiResponse" class="grid gap-2 p-6">
                                <USkeleton class="h-4 w-full" />
                                <USkeleton class="h-4 w-full" />
                                <USkeleton class="h-4 w-2/3" />
                            </div>
                            <div v-else class="space-y-2 p-6 overflow-auto">
                                <p class="text-sm text-gray-700 dark:text-gray-300">
                                    {{ simulatedResponse }} <strong>{{ userPrompt }}</strong>
                                </p>
                            </div>
                        </div>


                    </template>
                    <template #footer>
                        <div class="grid gap-4 w-full">

                            <!-- Simulate User Prompt -->
                            <!-- <UTextarea :rows="4" placeholder="Type your test prompt here..." class="w-full" /> -->
                            <UTextarea v-model="testPrompt" :rows="4" placeholder="Type your test prompt here..."
                                class="w-full" />
                            <!-- <UButton label="Send Test Prompt" icon="i-lucide-send" size="lg"
                                class="w-full justify-center" /> -->
                            <!-- <UButton label="Send Test Prompt" icon="i-lucide-send" size="lg" class="w-full justify-center" @click="userPrompt = testPrompt" /> -->
                            <UButton label="Send Test Prompt" icon="i-lucide-send" size="lg"
                                class="w-full justify-center" @click="sendTestPrompt" />
                        </div>
                    </template>
                </USlideover>

                <UButton label="Save Configuration" icon="i-lucide-save" size="lg" :loading="loading" @click="save"
                    class="w-full justify-center lg:w-auto" />
            </div>

        </div>

        <USeparator />

        <div class="mt-4 space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">Existing AI Configurations</h4>
            <UCard v-if="initializing" class="dark:bg-gray-800">
                <USkeleton class="h-4 w-[250px] mb-2 dark:bg-gray-700" />
                <USkeleton class="h-4 w-[200px] dark:bg-gray-700" />
            </UCard>
            <CardAi class="dark:bg-gray-800" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const providers = ref(['ChatGPT', 'Gemini', 'Claude', 'Mistral', 'Custom...'])
const selectedProvider = ref<string | null>(null)

const modelsMap: Record<string, string[]> = {
    ChatGPT: ['GPT-4 Turbo', 'GPT-4', 'GPT-3.5 Turbo'],
    Gemini: ['Gemini 1.5 Pro', 'Gemini 1.0 Pro', 'Gemini Nano'],
    Claude: ['Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku'],
    Mistral: ['Mistral Large', 'Mistral Medium', 'Mistral Small'],
    'Custom...': ['Custom Model 1', 'Custom Model 2']
}

const models = computed(() => selectedProvider.value ? modelsMap[selectedProvider.value] : [])
const modelsDisabled = computed(() => !selectedProvider.value)


// Simulate AI response
const open = ref(false)
const showAiGreeting = ref(false)
const showAiResponse = ref(false)
let responseTimeout: ReturnType<typeof setTimeout> | null = null
watch(open, (isOpen) => {
    if (isOpen) {
        showAiGreeting.value = false
        responseTimeout = setTimeout(() => {
            showAiGreeting.value = true
        }, 1500)
    } else {
        if (responseTimeout) {
            clearTimeout(responseTimeout)
            responseTimeout = null
        }
        showAiGreeting.value = false
    }
})

const userPrompt = ref('')
const testPrompt = ref('')

const simulatedResponse = ref('')
const responseTemplates = [
    "🤖 This is a simulated AI response to your prompt:",
    "🤖 Hmmm... that's an interesting prompt!",
    "🤖 I don't know what you're talking about, but I love the confidence.",
    "🤖 Sounds like a job for someone smarter than me!",
    "🤖 Okay, here's what I think... maybe.",
    "🤖 That's classified. Just kidding — I have no idea."
]

function sendTestPrompt() {
    userPrompt.value = testPrompt.value
    showAiResponse.value = false
    simulatedResponse.value = ''
    if (responseTimeout) clearTimeout(responseTimeout)
    responseTimeout = setTimeout(() => {
        const index = Math.floor(Math.random() * responseTemplates.length)
        simulatedResponse.value = responseTemplates[index]
        showAiResponse.value = true
    }, 2000)
}
</script>