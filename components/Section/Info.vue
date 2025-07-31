<template>
    <div class="font-semibold text-lg mb-8">
        Basic Information
    </div>
    <div class="space-y-4">
        <UFormField label="Section Title">
            <UInput placeholder="Enter section title ..." size="lg" class="w-full" />
        </UFormField>
        <UFormField label="Section Description">
            <UTextarea :rows="4" placeholder="Section description or purpose..." size="lg" class="w-full" />
        </UFormField>
    </div>
</template>