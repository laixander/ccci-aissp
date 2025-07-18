<template>
    <div :class="computedGridClass" ref="gridRef">
        <slot />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const props = defineProps({
    cols: { type: [Number, String], default: 1 },
    smCols: { type: [Number, String], default: null },
    mdCols: { type: [Number, String], default: null },
    lgCols: { type: [Number, String], default: null },
    xlCols: { type: [Number, String], default: null },
    gap: { type: String, default: 'gap-4' },
    dynamic: { type: Boolean, default: false }, // auto-count on mount
    responsive: { type: Boolean, default: true },
})

const gridRef = ref(null)
const childCount = ref(0)

onMounted(() => {
    if (props.dynamic && gridRef.value) {
        childCount.value = gridRef.value.children.length
    }
})

// Create Tailwind grid class strings
const computedGridClass = computed(() => {
    const cols = props.dynamic ? childCount.value || 1 : props.cols
    const sm = props.smCols ?? null
    const md = props.mdCols ?? null
    const lg = props.lgCols ?? null
    const xl = props.xlCols ?? null

    return [
        'grid',
        props.gap,
        `grid-cols-${cols}`,
        sm ? `sm:grid-cols-${sm}` : '',
        md ? `md:grid-cols-${md}` : '',
        lg ? `lg:grid-cols-${lg}` : '',
        xl ? `xl:grid-cols-${xl}` : '',
    ].filter(Boolean).join(' ')
})
</script>
