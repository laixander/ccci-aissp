<template>
    <!-- DB table preview -->
    <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-4">E. Strategic Concerns for ICT Use</h3>
    <!-- <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Column Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Data Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
            </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(column, index) in columns" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">{{ column.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ column.type }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ column.description }}</td>
            </tr>
        </tbody>
    </table> -->
    <UTable :data="data" :columns="columns" class="flex-1" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Sample data for database columns
const columns = ref([
    { header: 'Major Final Output', accessorKey: 'output' },
    { header: 'Critical Management', accessorKey: 'management' },
    { header: 'Problems', accessorKey: 'problems' },
    { header: 'Intended Use of ICT', accessorKey: 'intended' }
])
const data = ref([
    {
        output: 'Functional Library Services',
        management: 'Installation and maintenance of library equipment and Library resource management',
        problems: 'Insufficient or outdated hardware hindering access to e-library resources',
        intended: 'Support Access to Library Resources'
    },
    {
        output: 'Enhanced interactive learning experiences',
        management: 'Implementation of Smart Learning Platform',
        problems: 'Insufficient Computer laboratories due to constraints in regards to procurement',
        intended: 'Provide a means to enhance student learning via AI assisted learning platforms'
    },
    {
        output: 'Centralized and Adaptable learning space',
        management: 'Implementation of Smart Modular Classrooms',
        problems: 'Limited access to Educational technology learning tools',
        intended: 'Ease of provision of a computer laboratory through the use of a modular refurbished container'
    },
    {
        output: 'Centralized and Adaptable Learning Space',
        management: 'Implementation of Smart Modular Hub',
        problems: 'Limited hosting workshops, meetings or collaborative sessions',
        intended: 'Establishment of more versatile and designed multi-functional space that can serve various purposes beyond education, such as collaborative workspaces or community hubs.'
    },
    {
        output: 'Improved and Online interaction and communication',
        management: 'Enhancement of campus digital engagement platform',
        problems: 'Insufficient methods of communication and engagement',
        intended: 'Increase Engagement'
    }
])
</script>