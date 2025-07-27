export function useSimulatedLoading(delay = 1000) {
    const loading = ref(true)

    setTimeout(() => {
        loading.value = false
    }, delay)

    return { loading }
}