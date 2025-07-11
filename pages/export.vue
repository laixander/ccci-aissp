<template>
    <Page page-title="Export History" page-description="Track and manage document exports across all formats">
        <template #actions>
            <UButton icon="i-lucide-refresh-cw" size="lg" color="neutral" variant="outline" class="w-full lg:w-auto justify-center">Refresh</UButton>
            <UButton icon="i-lucide-download" size="lg" color="primary" class="w-full lg:w-auto justify-center">New Export</UButton>
        </template>
        <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardStat
                    v-for="stat in cardStats"
                    :key="stat.label"
                    v-bind="stat"
                />
            </div>

            <UCard>
                <div class="flex flex-col sm:flex-row gap-4">
                    <UInput icon="i-lucide-search" size="lg" variant="outline" placeholder="Search systems or entities..." :ui="uiSearchConfig" />
                    <USelect v-model="type" :items="types" size="lg" class="sm:w-48" />
                    <USelect v-model="status" :items="statuses" size="lg" class="sm:w-48" />
                </div>
            </UCard>

            <Block title="Export History" description="View and manage all document exports">
                <template #content>
                    <div class="space-y-4">
                        <CardExport
                            v-for="file in files"
                            :key="file.id"
                            :file="file"
                            @view="handleView"
                            @download="handleDownload"
                            @delete="handleDelete"
                        />
                    </div>
                </template>
            </Block>

            <Block title="Quick Export Options" description="Generate common reports and documents">
                <template #content>
                    <div class="flex flex-col md:flex-row gap-4">
                        <UButton size="lg" color="neutral" variant="outline" class="w-full flex-col justify-center py-6">
                            <UIcon name="i-lucide-file-text" class="w-5 h-5 text-red-500 dark:text-red-700" />
                            Export All ISSPs as PDF
                        </UButton>
                        <UButton size="lg" color="neutral" variant="outline" class="w-full flex-col justify-center py-6">
                            <UIcon name="i-lucide-file-spreadsheet" class="w-5 h-5 text-green-500 dark:text-green-700" />
                            Budget Summary Report
                        </UButton>
                        <UButton size="lg" color="neutral" variant="outline" class="w-full flex-col justify-center py-6">
                            <UIcon name="i-lucide-file-text" class="w-5 h-5 text-blue-500 dark:text-blue-700" />
                            Systems Inventory
                        </UButton>
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

const uiSearchConfig = {
    root: 'w-full',
}

const types = ref(['All Type', 'PDF', 'DOCX', 'XLSX'])
const type = ref(types.value[0])

const statuses = ref(['All Status', 'Completed', 'Processing', 'Failed'])
const status = ref(statuses.value[0])

const cardStats = [
  {
    icon: 'i-lucide-file-text',
    iconColor: 'text-red-500 dark:text-red-700',
    label: 'PDF Exports',
    value: '2'
  },
  {
    icon: 'i-lucide-file-text',
    iconColor: 'text-blue-500 dark:text-blue-700',
    label: 'Word Documents',
    value: '1'
  },
  {
    icon: 'i-lucide-file-spreadsheet',
    iconColor: 'text-green-500 dark:text-green-700',
    label: 'Excel Files',
    value: '2'
  },
  {
    icon: 'i-lucide-download',
    iconColor: 'text-violet-500 dark:text-violet-700',
    label: 'Total Downloads',
    value: '28'
  }
]

interface FileItemData {
  id: string;
  name: string;
  description: string;
  type: string;
  author: string;
  date: string;
  size: string;
  downloads: number;
  status: string;
}

// Sample data for the files, typed as an array of FileItemData
const files = ref<FileItemData[]>([
  {
    id: 'file-1',
    name: 'College_of_Engineering_ISSP_2024.pdf',
    description: 'College of Engineering ISSP',
    type: 'PDF',
    author: 'Dr. Maria Santos',
    date: '2024-12-01 14:30',
    size: '2.4 MB',
    downloads: 5,
    status: 'Completed',
  },
  {
    id: 'file-2',
    name: 'IT_Services_Strategic_Plan.docx',
    description: 'IT Services Strategic Plan',
    type: 'DOCX',
    author: 'Mr. Carlos Reyes',
    date: '2024-11-30 09:15',
    size: '1.8 MB',
    downloads: 12,
    status: 'Completed',
  },
  {
    id: 'file-3',
    name: 'Budget_Summary_Q4_2024.xlsx',
    description: 'Quarterly Budget Report',
    type: 'XLSX',
    author: 'Finance Office',
    date: '2024-11-28 16:45',
    size: '856 KB',
    downloads: 8,
    status: 'Completed',
  },
  {
    id: 'file-4',
    name: 'Systems_Inventory_Report.xlsx',
    description: 'Systems Management Report',
    type: 'XLSX',
    author: 'IT Services',
    date: '2024-11-27 11:20',
    size: '1.2 MB',
    downloads: 3,
    status: 'Completed',
  },
  {
    id: 'file-5',
    name: 'Library_Digital_Transformation.pdf',
    description: 'Library System ISSP',
    type: 'PDF',
    author: 'Ms. Ana Garcia',
    date: '2024-11-25 13:00',
    size: '3.1 MB',
    downloads: 0,
    status: 'Processing',
  },
]);

// Event handlers for the emitted events
const handleView = (id: string) => {
  console.log(`View file with ID: ${id}`);
  // Implement your view logic here, e.g., open a modal or navigate
};

const handleDownload = (id: string) => {
  console.log(`Download file with ID: ${id}`);
  // Implement your download logic here
};

const handleDelete = (id: string) => {
  console.log(`Delete file with ID: ${id}`);
  // Implement your delete logic here, e.g., show a confirmation dialog
  // and then remove the file from the 'files' array
  files.value = files.value.filter(file => file.id !== id);
};
</script>