<template>
  <div class="stripwrap" aria-hidden="true">
    <div class="strip" :class="variant">
      <div class="rail">
        <template v-for="(word, i) in rail" :key="i">
          <b>{{ word }}</b>{{ separator }}
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  words: string[]
  variant?: 'coral' | 'dark'
  separator?: string
  /** How many times the word list repeats per half of the rail. */
  repeat?: number
}>(), {
  variant: 'coral',
  separator: '✦',
  repeat: 3,
})

// The rail holds the content twice; sliding it by -50% then lands on an identical frame, so the loop is seamless.
const rail = computed(() => {
  const half = Array.from({ length: props.repeat }, () => props.words).flat()
  return [...half, ...half]
})
</script>

<style scoped>
.stripwrap {
  overflow: hidden;
  margin-block: clamp(44px, 7vw, 96px);
  position: relative;
  z-index: 2;
}

.strip { overflow: hidden; }

.rail {
  display: flex;
  width: max-content;
  white-space: nowrap;
  padding-block: 9px;
  font-family: var(--display);
  font-variation-settings: 'wdth' 80, 'wght' 900;
  font-size: clamp(20px, 3.1vw, 40px);
  letter-spacing: -0.01em;
  text-transform: uppercase;
  animation: slide 26s linear infinite;
}

.rail b {
  font-weight: inherit;
  padding-inline: 0.42em;
}

.coral {
  background: var(--coral);
  transform: rotate(-2.1deg) scale(1.06);
}
.coral .rail { color: var(--ink-deep); }

.dark {
  background: var(--ink-deep);
  transform: rotate(1.4deg) scale(1.06);
}
.dark .rail {
  color: var(--coral);
  font-family: var(--mono);
  font-size: clamp(14px, 1.9vw, 24px);
  font-weight: 500;
  letter-spacing: 0.22em;
  animation-duration: 34s;
  animation-direction: reverse;
}

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .rail { animation: none; }
}
</style>
