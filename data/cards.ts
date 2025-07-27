import type { WidgetProps } from '~/types/cards'
export const widgets: WidgetProps[] = [
    {
        title: 'Total ISSPs',
        value: 24,
        percentageChange: 12,
        changeType: 'increase',
        iconName: 'i-lucide-file-text',
        iconColor: 'text-white dark:text-blue-100',
        iconBgColor: 'bg-blue-500 dark:bg-blue-800',
    },
    {
        title: 'Approved',
        value: 18,
        percentageChange: 8,
        changeType: 'increase',
        iconName: 'i-lucide-circle-check-big',
        iconColor: 'text-white dark:text-green-100',
        iconBgColor: 'bg-green-500 dark:bg-green-800',
    },
    {
        title: 'Pending Review',
        value: 5,
        percentageChange: 2,
        changeType: 'decrease',
        iconName: 'i-lucide-clock',
        iconColor: 'text-white dark:text-yellow-100',
        iconBgColor: 'bg-yellow-500 dark:bg-yellow-700',
    },
    {
        title: 'Rejected',
        value: 1,
        percentageChange: 0,
        changeType: 'increase',
        iconName: 'i-lucide-circle-x',
        iconColor: 'text-white dark:text-red-100',
        iconBgColor: 'bg-red-500 dark:bg-red-800',
    },
]

import type { ActivityCardProps } from '~/types/cards'
export const activityCards: ActivityCardProps[] = [
    {
        title: 'ISSP approved',
        description: 'College of Engineering',
        timeAgo: '2 hours ago',
        typeColor: 'success'
    },
    {
        title: 'Document exported',
        description: 'IT Services',
        timeAgo: '4 hours ago',
        typeColor: 'info'
    },
    {
        title: 'Review requested',
        description: 'Library System',
        timeAgo: '6 hours ago',
        typeColor: 'warning'
    },
    {
        title: 'AI suggestions generated',
        description: 'Business Office',
        timeAgo: '1 day ago',
        typeColor: 'violet'
    }
]

import type { QueueCardProps } from '~/types/cards'
export const queueCards: QueueCardProps[] = [
    {
        name: 'College of Arts & Sciences',
        date: 'Dec 15, 2024',
        icon: 'i-lucide-calendar',
        priority: 'High'
    },
    {
        name: 'Graduate School',
        date: 'Dec 20, 2024',
        icon: 'i-lucide-calendar',
        priority: 'Medium'
    },
    {
        name: 'Research Division',
        date: 'Jan 5, 2025',
        icon: 'i-lucide-calendar',
        priority: 'Low'
    }
]

import type { StatCardProps } from '~/types/cards'
export const statCards: StatCardProps[] = [
    {
        icon: 'i-lucide-wallet',
        iconColor: 'text-green-500 dark:text-green-700',
        label: 'Total Budget',
        value: '₱10,400,000'
    },
    {
        icon: 'i-lucide-triangle-alert',
        iconColor: 'text-red-500 dark:text-red-700',
        label: 'High Priority',
        value: '2'
    },
    {
        icon: 'i-lucide-calendar',
        iconColor: 'text-blue-500 dark:text-blue-700',
        label: 'Active Systems',
        value: '2'
    },
    {
        icon: 'i-lucide-filter',
        iconColor: 'text-violet-500 dark:text-violet-700',
        label: 'Total Systems',
        value: '5'
    }
]

import type { SystemCardProps } from '~/types/cards'
export const systemCards: SystemCardProps[] = [
    {
        system: 'Student Information System',
        entity: 'Registrar Office',
        budget: '₱2,500,000',
        priority: 'high',
        status: 'active',
        deadline: 'Dec 15, 2024',
    },
    {
        system: 'Learning Management System',
        entity: 'Academic Affairs',
        budget: '₱1,800,000',
        priority: 'high',
        status: 'in progress',
        deadline: 'Jan 10, 2025',
    },
    {
        system: 'Financial Management System',
        entity: 'Finance Office',
        budget: '₱3,200,000',
        priority: 'medium',
        status: 'planning',
        deadline: 'Feb 20, 2025',
    },
    {
        system: 'Human Resource Information System',
        entity: 'HR Department',
        budget: '₱2,100,000',
        priority: 'medium',
        status: 'active',
        deadline: 'Mar 15, 2025',
    },
    {
        system: 'Library Management System',
        entity: 'University Library',
        budget: '₱800,000',
        priority: 'low',
        status: 'completed',
        deadline: 'Apr 25, 2025',
    }
]
