<template>
  <section class="hero">
    <!-- Stretched so the letters run from the hero's top line to its bottom line, and edge to edge across the column. -->
    <div class="vname">
      <FitText text="Deshae Dekker" stretch="extra-condensed" vertical />
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
/*
 * Name column + photo. The hero is at least 80% of the viewport tall, rounded down to
 * whole grid cells so the page below it starts on a line.
 *
 * mod(margin, grid) is the distance from the page edge to the first grid line. The name
 * starts on that line and the column ends on the first line past the name's natural width
 * (about 0.115x its height), so both of the name's sides are grid lines.
 */
.hero {
  --hero-h: round(down, max(80svh, 88svh - 40px, 420px), var(--grid));
  --name-w: calc(var(--hero-h) * 0.115);
  --first-line: mod(var(--margin), var(--grid));
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: calc(var(--first-line) + round(up, var(--name-w), var(--grid))) 1fr;
  /*
   * Lock the row to the hero's height. Without this the row is sized from its content:
   * the SVG would take the column's width and grow tall from its aspect ratio.
   */
  grid-template-rows: minmax(0, 1fr);
  height: var(--hero-h);
}

/* Solid page colour hides the grid behind the name. */
.vname {
  min-height: 0;
  padding-left: var(--first-line);
  background: var(--ink);
  color: var(--coral);
}

.vname .fit-text {
  width: 100%;
  height: 100%;
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
  right: var(--margin);
  top: calc(var(--grid) / 4);
  z-index: 1;
  color: var(--paper);
  mix-blend-mode: difference;
}

/* Hangs off the bottom edge so the title bleeds into the next section. */
.hero-title {
  position: absolute;
  right: var(--margin);
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
