import type { StepperItem } from "@nuxt/ui";

export const NEW_SYSTEM_STEPPER: StepperItem[] = [
    {
        title: 'Basic Info',
        description: 'General details about the system',
        icon: 'i-lucide-info',
        slot: 'basic' as const
    },
    {
        title: 'Technical Details',
        description: 'Database, storage, and modules',
        icon: 'i-lucide-cpu',
        slot: 'technical' as const
    },
    {
        title: 'Usage & Integration',
        description: 'Users and systems linked',
        icon: 'i-lucide-users',
        slot: 'usage' as const
    },
    {
        title: 'Security & Notes',
        description: 'Security and extra information',
        icon: 'i-lucide-shield-check',
        slot: 'security' as const
    },
    {
        title: 'Deliverables',
        description: 'Outputs associated with system',
        icon: 'i-lucide-package',
        slot: 'deliverables' as const
    },
    {
        title: 'Strategic Concerns',
        description: 'Identify key challenges or priorities',
        icon: 'i-lucide-goal',
        slot: 'concerns' as const
    },
]