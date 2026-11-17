<template>
  <div class="stripwrap" :style="{ '--rows': rows }" aria-hidden="true">
    <div class="strip" :class="variant">
      <div class="rail">
        <template v-for="(word, i) in rail" :key="i">
          <span class="word">{{ word }}</span>
          <!-- Drawn shapes instead of text glyphs: a glyph's position depends on the font that renders it. -->
          <svg v-if="separator === 'star'" class="sep star" viewBox="0 0 20 20">
            <path d="M10 0 C11 7 13 9 20 10 C13 11 11 13 10 20 C9 13 7 11 0 10 C7 9 9 7 10 0 Z" />
          </svg>
          <span v-else class="sep dash" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  words: string[]
  variant?: 'coral' | 'dark'
  separator?: 'star' | 'dash'
  /** How many times the word list repeats per half of the rail. */
  repeat?: number
  /** Height of the band the strip is centred in, in grid cells. */
  rows?: number
}>(), {
  variant: 'coral',
  separator: 'star',
  repeat: 3,
  rows: 2,
})

// The rail holds the content twice; sliding it by -50% then lands on an identical frame, so the loop is seamless.
const rail = computed(() => {
  const half = Array.from({ length: props.repeat }, () => props.words).flat()
  return [...half, ...half]
})
</script>

<style scoped>
/*
 * A band of whole grid cells with the strip centred in it, so the content after it
 * still starts on a line.
 * Clip sideways only. `overflow: hidden` also clipped vertically, which cut off
 * the top and bottom corners of the tilted strip.
 */
.stripwrap {
  height: calc(var(--grid) * var(--rows));
  display: grid;
  align-content: center;
  overflow-x: clip;
  overflow-y: visible;
  position: relative;
  z-index: 2;
}

.strip { overflow: hidden; }

/* Flex + align-items centres words and separators on the same middle line. */
.rail {
  display: flex;
  align-items: center;
  width: max-content;
  white-space: nowrap;
  padding-block: 0.42em;
  line-height: 1;
  font-family: var(--display);
  font-variation-settings: 'wdth' 80, 'wght' 900;
  font-size: clamp(20px, 3.1vw, 40px);
  letter-spacing: -0.01em;
  text-transform: uppercase;
  animation: slide 26s linear infinite;
}

/*
 * A line box reserves room for accents above and descenders below, so all-caps text
 * looks too high in it. text-box trims the box to the cap height and the baseline,
 * which makes the visible letters the thing that gets centred.
 */
.word {
  padding-inline: 0.42em;
  text-box: trim-both cap alphabetic;
}

@supports not (text-box: trim-both cap alphabetic) {
  .word { padding-top: 0.12em; }
}

.sep { flex: none; }

.star {
  width: 0.5em;
  height: 0.5em;
  fill: currentColor;
}

.dash {
  width: 1.4em;
  height: 0.12em;
  background: currentColor;
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
  padding-block: 0.8em;
  animation-duration: 34s;
  animation-direction: reverse;
}
/* Letter-spacing adds space after the last letter too; this evens out both sides of each word. */
.dark .word { padding-inline: 0.9em calc(0.9em - 0.22em); }

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .rail { animation: none; }
}
</style>
