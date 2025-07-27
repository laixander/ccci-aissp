export function useWidgetChange(changeType: 'increase' | 'decrease') {
    const isIncrease = computed(() => changeType === 'increase')
    return { isIncrease }
}