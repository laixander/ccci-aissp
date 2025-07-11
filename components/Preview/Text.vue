<template>
    <div class="space-y-6 p-6">
        <!-- Title -->
        <div class="space-y-1 pb-8">
            <p class="text-sm text-center">President, MSU System</p>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">Table of Contents</h2>
        </div>
        <div v-for="part in toc" :key="part.label" class="space-y-4">
            <!-- Part Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <span class="font-bold uppercase text-gray-800 dark:text-gray-100">{{ part.label }}.</span>
                    <h3 class="flex-1 font-bold uppercase text-gray-800 dark:text-gray-100">
                        {{ part.title }}
                    </h3>
                </div>
            </div>

            <!-- Sections -->
            <div class="ml-12 space-y-4 mt-1">

                <div v-for="section in part.sections" :key="section.label" class="space-y-2">
                    <!-- Main Item -->
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center space-x-2">
                            <span class="text-gray-500 dark:text-gray-400">{{ section.label }}.</span>
                            <span class="flex-1 text-gray-800 dark:text-gray-100">
                                {{ section.title }}
                            </span>
                        </div>
                        <div class="flex-1 mx-4 border-b border-dotted border-gray-200" v-if="section.page"></div>
                        <span v-if="section.page" class="text-gray-500 dark:text-gray-400 text-right">
                            {{ section.page }}
                        </span>
                    </div>

                    <!-- Sub Items -->
                    <div v-if="section.children" class="ml-12 space-y-1 text-sm">
                        <div v-for="child in section.children" :key="child.label" class="flex items-center space-x-4">
                            <span class="text-gray-500 dark:text-gray-400">{{ child.label }}.</span>
                            <span class="flex-1 text-gray-800 dark:text-gray-100">
                                {{ child.title }}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const toc = [
    {
        label: 'Part I',
        title: 'Organizational Profile',
        sections: [
            {
                label: 'A',
                title: 'Department/Agency Vision/Mission Statement',
                page: 4,
                children: [
                    { label: 'A.1', title: 'Mandate' },
                    { label: 'A.2', title: 'Vision Statement' },
                    { label: 'A.3', title: 'Mission Statement' },
                    { label: 'A.4', title: 'Major Final Outputs' },
                ],
            },
            {
                label: 'B',
                title: 'Department/Agency Profile',
                page: 6,
                children: [
                    { label: 'B.1', title: 'Name of Designated IS Planner' },
                    { label: 'B.2', title: 'Current Annual ICT Budget' },
                    { label: 'B.3', title: 'Organizational Structure' },
                ],
            },
            {
                label: 'C',
                title: 'The Department/Agency and its Environment (Functional Interface Chart)',
                page: 20,
            },
            {
                label: 'D',
                title: 'Present ICT Situation (Strategic Challenges)',
                page: 21,
            },
            {
                label: 'E',
                title: 'Strategic Concerns for ICT Use',
                page: 23,
            },
        ],
    },
    {
        label: 'Part II',
        title: 'Information Systems Strategy',
        sections: [
            {
                label: 'A',
                title: 'Conceptual Framework for Information Systems (Diagram of IS Interface)',
                page: 26,
            },
            {
                label: 'B',
                title: 'Detailed Description of Proposed Information Systems',
                page: 27,
            },
            {
                label: 'C',
                title: 'Databases Required',
                page: 33,
            },
            {
                label: 'D',
                title: 'Network Layout',
                page: 37,
            }
        ],
    },
    {
        label: 'Part III',
        title: 'Detailed Description of ICT Projects',
        sections: [
            {
                label: 'A',
                title: 'Internal ICT Projects',
                page: 38,
            },
            {
                label: 'B',
                title: 'Cross-Agency ICT Projects',
                page: 49,
            },
            {
                label: 'C',
                title: 'Performance Measurement Framework',
                page: 50,
            }
        ],
    },
    {
        label: 'Part IV',
        title: 'Resource Requirements',
        sections: [
            {
                label: 'A',
                title: 'Deployment of ICT Equipment and Services',
                page: 64,
            },
            {
                label: 'B',
                title: 'ICT Organizational Structure',
                page: 80,
                children: [
                    { label: 'B.1', title: 'Existing ICT Organizational Structure' },
                    { label: 'B.2', title: 'Proposed ICT Organizational Structure' },
                    { label: 'B.3', title: 'Placement of the Proposed ICT Organizational Structure' },
                ],
            }
        ],
    },
    {
        label: 'Part V',
        title: 'Development and Investment Program',
        sections: [
            {
                label: 'A',
                title: 'ICT Projects Implementation Schedule',
                page: 87,
            },
            {
                label: 'B',
                title: 'IS Implementation Schedule',
                page: 88,
            },
            {
                label: 'C',
                title: 'Summary of Investments',
                page: 90,
            },
            {
                label: 'D',
                title: 'Year 2024 Cost Breakdown',
                page: 115,
            }
        ],
    },
]
</script>