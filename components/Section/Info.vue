<template>
    <div class="p-4 border-b border-gray-200 dark:border-gray-800">
        <span class="font-semibold text-lg">Basic Information</span>
    </div>
    <div class="space-y-4 p-4">
        <UFormField label="Section Title">
            <UInput placeholder="Enter section title ..." size="lg" class="w-full" />
        </UFormField>
        <UFormField label="Section Description">
            <UTextarea :rows="4" placeholder="Section description or purpose..." size="lg" class="w-full" />
        </UFormField>
    </div>
</template>