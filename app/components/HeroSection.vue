<template>
  <section class="hero">
    <!--
      The name is SVG text with textLength, so it always spans the column's full height
      regardless of screen size or which font has loaded.
    -->
    <div class="vname" aria-hidden="true">
      <svg viewBox="0 0 120 1000" preserveAspectRatio="xMidYMid meet">
        <text x="-1000" y="117" transform="rotate(-90)" textLength="1000" lengthAdjust="spacingAndGlyphs">
          Deshae Dekker
        </text>
      </svg>
    </div>

    <div class="photo">
      <img
        src="/img/hero.jpg"
        alt="Black-and-white photo of a man in sunglasses holding up strands of spaghetti over a bowl"
        fetchpriority="high"
      >
      <div class="hero-meta tag">52.37° N / 5.22° E</div>
    </div>

    <div class="hero-title">
      <h1 class="disp">Frontend<br><em>Developer</em></h1>
    </div>
  </section>
</template>

<style scoped>
/* Name column + photo. The hero is at least 80% of the viewport tall. */
.hero {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: auto 1fr;
  height: max(80svh, 88svh - 40px, 420px);
  border-bottom: 1px solid var(--line);
}

/* Solid fill hides the grid, so the name column reads as its own panel beside the photo. */
.vname {
  height: 100%;
  background: var(--ink-deep);
  padding: clamp(8px, 1.2vw, 16px) clamp(4px, 0.8vw, 10px);
}

.vname svg {
  display: block;
  height: 100%;
  width: auto;
  aspect-ratio: 120 / 1000;
}

.vname text {
  fill: var(--coral);
  font-family: var(--display);
  font-variation-settings: 'wdth' 62, 'wght' 900;
  font-size: 160px;
  text-transform: uppercase;
}

.photo {
  position: relative;
  overflow: hidden;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
  filter: grayscale(1) contrast(1.18) brightness(0.92);
}

.photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(44 44 44 / 0.25), rgb(44 44 44 / 0) 38%, rgb(44 44 44 / 0.5));
}

.hero-meta {
  position: absolute;
  right: max(22px, env(safe-area-inset-right, 0px));
  top: 18px;
  z-index: 1;
  color: var(--paper);
  mix-blend-mode: difference;
}

/* Hangs off the bottom edge so the title bleeds into the next section. */
.hero-title {
  position: absolute;
  right: max(20px, env(safe-area-inset-right, 0px));
  bottom: 0;
  transform: translateY(52%);
  text-align: right;
  max-width: calc(100% - 140px);
  pointer-events: none;
}

.hero-title h1 {
  font-size: clamp(42px, 8.6vw, 132px);
  color: var(--coral);
}

.hero-title h1 em {
  font-style: normal;
  color: transparent;
  -webkit-text-stroke: 2px var(--coral);
}
</style>
