<template>
  <!--
    Purely decorative: an abstract print-style poster that fills the space beside the jump nav.
    Three flat shapes on paper, overprinted on a halftone field.
  -->
  <div class="poster" aria-hidden="true">
    <div class="dots" />
    <div class="sun" />
    <div class="quarter" />
    <div class="bar" />
  </div>
</template>

<style scoped>
.poster {
  position: relative;
  height: 100%;
  min-height: 280px;
  background: var(--paper);
  border: 1px solid var(--paper);
  overflow: hidden;
  isolation: isolate; /* keeps the blend mode below from mixing with the page behind the poster */
}

.poster > * { position: absolute; }

/*
 * Halftone: one dot per 12px tile. The mask fades the field from dense (bottom right)
 * to empty (top left), like a printed gradient.
 */
.dots {
  inset: 0;
  background: radial-gradient(circle, var(--ink-deep) 32%, transparent 34%) 0 0 / 12px 12px;
  mask-image: linear-gradient(135deg, transparent 20%, #000 90%);
}

/* Oversized coral disc cropped by the top-right edge. multiply lets the dots print through it. */
.sun {
  top: -14%;
  right: -22%;
  width: 82%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--coral);
  mix-blend-mode: multiply;
}

/* Solid ink quarter circle anchored to the bottom-left corner. */
.quarter {
  left: 0;
  bottom: 0;
  width: 56%;
  aspect-ratio: 1;
  background: var(--ink-deep);
  border-top-right-radius: 100%;
}

/* One heavy rule cutting across both shapes. */
.bar {
  left: 0;
  right: 0;
  top: 58%;
  height: 14px;
  background: var(--ink-deep);
}
</style>
