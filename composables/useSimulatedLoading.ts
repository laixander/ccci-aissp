// composables/useSimulatedLoading.ts
import { ref, onMounted } from 'vue'

export function useSimulatedLoading(delay = 2000) {
  const loading = ref(true)

  onMounted(() => {
    setTimeout(() => {
      loading.value = false
    }, delay)
  })

  return { loading }
}
