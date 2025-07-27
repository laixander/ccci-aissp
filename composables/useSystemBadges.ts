import type { SystemPriority, SystemStatus } from '~/types/cards'

export function useSystemBadges(priority: SystemPriority, status: SystemStatus) {
    const priorityColorMap = {
        high: 'error',
        medium: 'warning',
        low: 'success',
    } as const

    const statusColorMap = {
        active: 'secondary',
        inprogress: 'orange',
        'in progress': 'orange',
        planning: 'violet',
        completed: 'success',
    } as const

    const capitalize = (str: string) => {
        const lower = str.toLowerCase()
        if (lower === 'inprogress' || lower === 'in progress') return 'In Progress'
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const priorityColor = computed(() => priorityColorMap[priority] ?? 'neutral')
    const statusColor = computed(() => statusColorMap[status] ?? 'neutral')
    const priorityDisplay = computed(() => capitalize(priority))
    const statusDisplay = computed(() => capitalize(status))

    return {
        priorityColor,
        statusColor,
        priorityDisplay,
        statusDisplay,
    }
}