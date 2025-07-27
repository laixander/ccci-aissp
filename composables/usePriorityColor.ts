import type { PriorityLevel } from '~/types/cards'

export function usePriorityColor(priority: PriorityLevel) {
    const priorityColorMap = {
        Low: 'success',
        Medium: 'warning',
        High: 'error',
    } as const

    return computed(() => priorityColorMap[priority] ?? 'neutral')
}