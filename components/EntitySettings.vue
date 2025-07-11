<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <div class="grid lg:flex items-center gap-4">
                <UFormField label="Entity Name" size="lg" class="w-full">
                    <UInput placeholder="e.g., College of Science" class="w-full" />
                </UFormField>
                <UFormField label="Entity Code" size="lg" class="w-full lg:w-1/4">
                    <UInput placeholder="e.g., COS" class="w-full" />
                </UFormField>
                <UFormField label="Color Code" size="lg" class="w-full lg:w-auto">
                    <UPopover>
                        <UButton label="Choose color" color="neutral"
                            variant="soft" size="lg" class="w-full justify-center">
                            <template #leading>
                                <span :style="chip" class="size-3 rounded-full" />
                            </template>
                        </UButton>
                        <template #content>
                            <UColorPicker v-model="color" class="p-2" />
                        </template>
                    </UPopover>
                </UFormField>
            </div>

            <div class="grid lg:flex lg:justify-end items-center gap-2">
                <UButton label="Save Entity" icon="i-lucide-save" size="lg" color="primary" variant="solid" class="w-full justify-center lg:w-auto" />
            </div>
        </div>

        <USeparator />

        <div class="space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">Existing Entities</h4>
            <CardEntity
                v-for="campus in campuses"
                :key="campus.id"
                :name="campus.name"
                :code="campus.code"
                :color-code="campus.colorCode"
                :is-active="campus.isActive"
                @toggle="toggleCampusStatus(campus.id)"
                @select="selectCampus(campus)"
            />
        </div>
    </div>

</template>

<script setup lang="ts">
const color = ref('#00C16A')
const chip = computed(() => ({ backgroundColor: color.value }))

import { ref } from 'vue';

// Define an interface for your campus data for better type safety
interface Campus {
  id: number;
  name: string;
  code: string;
  colorCode: string;
  isActive: boolean;
}

const campuses = ref<Campus[]>([
  { id: 1, name: 'Main Campus', code: 'MC-001', colorCode: '#FF5733', isActive: true },
  { id: 2, name: 'North Campus', code: 'NC-002', colorCode: '#33FF57', isActive: false },
  { id: 3, name: 'South Campus', code: 'SC-003', colorCode: '#3357FF', isActive: true },
  { id: 4, name: 'Extension Campus', code: 'EC-004', colorCode: '#FF33A1', isActive: true },
]);

const toggleCampusStatus = (id: number) => {
  const campus = campuses.value.find(c => c.id === id);
  if (campus) {
    campus.isActive = !campus.isActive;
    console.log(`Campus ${campus.name} (ID: ${id}) active status toggled to: ${campus.isActive}`);
  }
};

const selectCampus = (campus: Campus) => {
  console.log(`Campus "${campus.name}" (Code: ${campus.code}) selected.`);
  // Here, you might navigate to a campus detail page or open a modal
};
</script>