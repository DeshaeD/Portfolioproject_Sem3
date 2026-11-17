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
 * stays under the same element the whole time. Lines start at the page's centre
 * line, matching the centred .wrap, and at the very top of the page.
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
  background-position: 50% 0;
}

main {
  position: relative;
  z-index: 1;
}
</style>
