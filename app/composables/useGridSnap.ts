import type { Ref } from 'vue'

/*
 * Rounds a block's height up to a whole number of grid cells, so whatever comes after it
 * starts on a background line. CSS can't round a height that depends on content, so this
 * measures it instead.
 *
 * outer: the element that gets the min-height. inner: its content, measured without it.
 */
export function useGridSnap(
  outer: Readonly<Ref<HTMLElement | null>>,
  inner: Readonly<Ref<HTMLElement | null>>,
) {
  const minHeight = ref<string>()
  let observer: ResizeObserver | undefined

  function snap() {
    if (!outer.value || !inner.value) return
    // --grid is registered with @property, so this is a computed px value, not the calc() text.
    const cell = parseFloat(getComputedStyle(outer.value).getPropertyValue('--grid'))
    if (!cell) return
    const rows = Math.ceil(inner.value.getBoundingClientRect().height / cell - 0.01)
    minHeight.value = `${rows * cell}px`
  }

  // Browser only: ResizeObserver doesn't exist during SSR, so the snap happens after hydration.
  onMounted(() => {
    observer = new ResizeObserver(snap)
    observer.observe(inner.value!) // content grew or shrank
    observer.observe(outer.value!) // width changed, which changes the cell size
  })

  onBeforeUnmount(() => observer?.disconnect())

  return minHeight
}
