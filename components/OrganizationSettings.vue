<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <div class="grid grid-cols-1 lg:grid-cols-6 gap-4">
                <UFormField label="Entity Name" size="lg" class="col-span-2">
                    <SelectEntity />
                </UFormField>
                <UFormField label="Organization Name" size="lg" class="col-span-2">
                    <UInput placeholder="e.g., ICT" class="w-full" />
                </UFormField>
                <UFormField label="Organization Description" size="lg" class="col-span-2">
                    <UInput placeholder="e.g., IT Department" class="w-full" />
                </UFormField>
                <UFormField label="Organization Type" size="lg" class="col-span-2">
                    <SelectOrganizationType />
                </UFormField>
                <UFormField label="Organization Head" size="lg" class="col-span-2">
                    <SelectOrganization />
                </UFormField>
            </div>

            <div class="grid lg:flex lg:justify-end items-center gap-2">
                <UButton label="Save Organization" icon="i-lucide-save" size="lg" variant="solid" class="w-full justify-center lg:w-auto" />
            </div>
        </div>

        <USeparator />
        
        <div class="space-y-3">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">Existing Organizations</h4>
            <CardOrganization 
                v-for="item in items"
                :key="item.id"
                :name="item.name"
                :description="item.description"
                :type="item.type"
                :entity="item.entity"
                :entity-id="item.entityId"
                :is-active="item.isActive"
                @toggle="toggleItemStatus(item.id)"
                @select="selectItem(item)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define an interface for better type safety for your item data
interface Item {
  id: number;
  name: string;
  description: string;
  type: string;
  entity: string;
  entityId: number;
  isActive: boolean;
}

// Sample data for your items
const items = ref<Item[]>([
  { 
    id: 1, 
    name: 'User Management Module', 
    description: 'Handles user creation, roles, and permissions.', 
    type: 'Module', 
    entity: 'System', 
    entityId: 101, 
    isActive: true 
  },
  { 
    id: 2, 
    name: 'Reporting Dashboard', 
    description: 'Provides analytical reports and data visualization.', 
    type: 'Feature', 
    entity: 'Analytics', 
    entityId: 202, 
    isActive: false 
  },
  { 
    id: 3, 
    name: 'Payment Gateway Integration', 
    description: 'Secure processing of online payments.', 
    type: 'Integration', 
    entity: 'Finance', 
    entityId: 303, 
    isActive: true 
  },
  { 
    id: 4, 
    name: 'Notification Service', 
    description: 'Sends email and SMS alerts to users.', 
    type: 'Service', 
    entity: 'Communication', 
    entityId: 404, 
    isActive: true 
  },
]);

// Function to handle the 'toggle' event from a MyCard component
const toggleItemStatus = (id: number) => {
  const item = items.value.find(i => i.id === id);
  if (item) {
    item.isActive = !item.isActive; // Toggle the isActive status
    console.log(`Item "${item.name}" (ID: ${id}) active status toggled to: ${item.isActive}`);
  }
};

// Function to handle the 'select' event from a MyCard component
const selectItem = (item: Item) => {
  console.log(`Item "${item.name}" (Type: ${item.type}, Entity: ${item.entity}) selected.`);
  // Here, you might navigate to a detailed view or open a modal for this item
};
</script>