<template>
  <div>
    <div class="grid-bg" aria-hidden="true" />
    <main>
      <slot />
    </main>
    <ScrollReadout />
  </div>
</template>

<style scoped>
/* Fixed blueprint lattice behind everything. */
.grid-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: var(--grid) var(--grid);
}

main {
  position: relative;
  z-index: 1;
}
</style>
