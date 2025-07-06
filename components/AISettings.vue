<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <UForm :state="state" class="space-y-2">
                <div class="grid lg:flex gap-4">
                    <UFormField class="w-full" label="AI Provider" help="Select your preferred AI platform." size="lg">
                        <USelect v-model="selectedProvider" placeholder="Select ai provider" :items="providers" class="w-full" />
                    </UFormField>
                    <UFormField class="w-full" label="Model Version" help="Choose the specific model version to use." size="lg">
                        <USelect :disabled="modelsDisabled" placeholder="Select a model version" :items="models" class="w-full" />
                    </UFormField>
                </div>
                

                <UFormField class="w-full" label="API Endpoint (URL)" help="Enter the API URL for the selected AI." size="lg">
                    <UInput class="w-full" placeholder="e.g. https://api.openai.com/v1/chat/completions" />
                </UFormField>

                <div class="grid lg:flex gap-4">
                    <UFormField class="w-full" label="Access Key" help="Your public API access key." size="lg">
                        <UInput class="w-full" placeholder="e.g. sk-xxxxxx" />
                    </UFormField>
                    <UFormField class="w-full" label="Secret Key" help="Your public API access key.Your private API secret key (kept securely)." size="lg">
                        <UInput class="w-full" placeholder="e.g. secret-xxxxxx" />
                    </UFormField>
                </div>

                <UFormField label="Initial Prompt Template" help="Define a default instruction or context prompt for the AI to use on initialization.">
                    <UTextarea :rows="4" placeholder="e.g. You are an assistant that provides concise and helpful responses." class="w-full" />
                </UFormField>
            </UForm>

            <div class="grid lg:flex lg:justify-end items-center gap-2">
                <UButton label="Save Configuration" icon="i-lucide-save" size="lg" :loading="loading" @click="save" class="w-full justify-center lg:w-auto" />
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
import { ref, computed } from 'vue'

const providers = ref([ 'ChatGPT', 'Gemini', 'Claude', 'Mistral', 'Custom...' ])
const selectedProvider = ref<string | null>(null)

const modelsMap: Record<string, string[]> = {
  ChatGPT: [ 'GPT-4 Turbo', 'GPT-4', 'GPT-3.5 Turbo' ],
  Gemini: [ 'Gemini 1.5 Pro', 'Gemini 1.0 Pro', 'Gemini Nano' ],
  Claude: [ 'Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku' ],
  Mistral: [ 'Mistral Large', 'Mistral Medium', 'Mistral Small' ],
  'Custom...': [ 'Custom Model 1', 'Custom Model 2' ]
}

const models = computed(() => selectedProvider.value ? modelsMap[selectedProvider.value] : [])
const modelsDisabled = computed(() => !selectedProvider.value)
</script>