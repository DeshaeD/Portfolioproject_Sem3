<template>
  <div class="page">
    <div class="grid-bg" aria-hidden="true" />
    <main>
      <slot />
    </main>
    <ScrollReadout />
  </div>
</template>

<style scoped>
/* The grid is positioned against this wrapper, so it is as tall as the whole page. */
.page { position: relative; }

/*
 * Blueprint lattice that scrolls with the content (absolute, not fixed), so a line
 * stays under the same element the whole time.
 * x: a % background position places the tile's centre at that point, so 50% + half a tile
 *    puts a line exactly on the page's centre. The frame is an even number of cells
 *    centred on that line, so both of its edges land on lines too.
 * y: the first line sits at the bottom of the top bar, where the hero starts.
 */
.grid-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: var(--grid) var(--grid);
  background-position: calc(50% + var(--grid) / 2) var(--topbar);
}

main {
  position: relative;
  z-index: 1;
}
</style>
