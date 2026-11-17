<template>
  <!--
    Display text cropped to its letters, not to its line box: the viewBox runs from the left edge
    of the first letter to the right edge of the last, and from cap height to baseline.
    preserveAspectRatio="none" then lets CSS stretch it to any box, so the letters themselves
    touch the grid lines.
  -->
  <svg
    class="fit-text"
    :viewBox="viewBox"
    preserveAspectRatio="none"
    :style="{ '--aspect': aspect }"
    aria-hidden="true"
    focusable="false"
  >
    <text
      ref="textEl"
      :class="{ outline }"
      :transform="vertical ? 'rotate(-90)' : undefined"
      :style="{ fontStretch: stretch, fontWeight: weight }"
    >{{ upper }}</text>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string
  /** Width axis. Keywords, because canvas (used to measure) only understands keywords. */
  stretch?: 'extra-condensed' | 'condensed'
  weight?: number
  /** Outlined letters instead of filled. */
  outline?: boolean
  /** Read bottom-to-top, like a book spine. */
  vertical?: boolean
}>(), {
  stretch: 'condensed',
  weight: 900,
  outline: false,
  vertical: false,
})

const SIZE = 100 // font-size in viewBox units; only the proportions matter
const upper = computed(() => props.text.toUpperCase())

// Letter bounds relative to the text origin (left end of the baseline).
// Before the browser can measure (SSR), estimate from an average letter width.
const ink = ref({
  left: 3,
  right: upper.value.length * (props.stretch === 'condensed' ? 55 : 47),
  top: -70,
  bottom: 0,
})

const viewBox = computed(() => {
  const { left, right, top, bottom } = ink.value
  // rotate(-90) maps (x, y) to (y, -x), so the box turns on its side.
  return props.vertical
    ? `${top} ${-right} ${bottom - top} ${right - left}`
    : `${left} ${top} ${right - left} ${bottom - top}`
})

/** Width / height of the letters: consumers use it to size the box without distorting. */
const aspect = computed(() => {
  const { left, right, top, bottom } = ink.value
  const w = right - left
  const h = bottom - top
  return props.vertical ? h / w : w / h
})

const textEl = useTemplateRef<SVGTextElement>('textEl')

/*
 * measureText reports where the ink actually is, unlike SVG's getBBox, which includes the
 * space reserved for accents and descenders. The cap height comes from "H", so round letters
 * (O, S) may overshoot the line slightly, which is how type is meant to sit on a line.
 */
function measure() {
  if (!textEl.value) return
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return
  ctx.font = `${props.weight} ${SIZE}px ${getComputedStyle(textEl.value).fontFamily}`
  ctx.fontStretch = props.stretch
  const word = ctx.measureText(upper.value)
  const cap = ctx.measureText('H')
  ink.value = {
    left: -word.actualBoundingBoxLeft,
    right: word.actualBoundingBoxRight,
    top: -cap.actualBoundingBoxAscent,
    bottom: 0,
  }
}

onMounted(async () => {
  await document.fonts.ready // measuring the fallback font would give the wrong box
  measure()
})
watch(upper, measure)
</script>

<style scoped>
.fit-text {
  display: block;
  overflow: visible; /* half of an outline stroke sits outside the letters */
}

text {
  font-family: var(--display);
  font-size: 100px;
  fill: currentColor;
}

/* non-scaling-stroke keeps the outline 1.5px even when the SVG is stretched unevenly. */
text.outline {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5px;
  vector-effect: non-scaling-stroke;
}
</style>
