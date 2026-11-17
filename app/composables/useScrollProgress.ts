/**
 * Tracks the window's scroll position and how far down the page it is (0–100).
 * Starts at 0 on the server and on first client render so hydration matches.
 */
export function useScrollProgress() {
  const y = ref(0)
  const percent = ref(0)
  let ticking = false

  function measure() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    y.value = Math.round(window.scrollY)
    percent.value = Math.min(100, Math.round((window.scrollY / max) * 100))
    ticking = false
  }

  // Throttle to one measurement per animation frame.
  function onScroll() {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(measure)
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    measure()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', measure)
  })

  return { y, percent }
}
