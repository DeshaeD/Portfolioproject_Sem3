<template>
  <div class="plate-grid navwrap">
    <div class="col navcol" style="--col: 1 / span 4">
      <p class="tag co label">Jump to —</p>
      <nav class="nav" aria-label="Section shortcuts">
        <!-- Plain <a>, not <NuxtLink>: these are in-page hash jumps, not route changes. -->
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :style="{ '--item-bg': link.bg, '--item-fg': link.fg }"
        >
          <span class="cell">
            <span class="word">{{ link.word }}</span>
            <span class="dest">{{ link.dest }}</span>
          </span>
          <span class="go" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M8 24h30M26 12l12 12-12 12" stroke="currentColor" stroke-width="4" stroke-linecap="square" />
            </svg>
          </span>
        </a>
      </nav>
    </div>

    <div class="col filler" style="--col: 6 / span 7">
      <PosterFiller />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JumpLink } from '~/data/site'

defineProps<{ links: JumpLink[] }>()
</script>

<style scoped>
/*
 * Four cells of nav, one empty cell, seven cells of poster.
 * The label hangs above the nav so the first row's top edge is the grid line.
 */
.navcol { position: relative; }

.label {
  position: absolute;
  bottom: 100%;
  margin-bottom: 12px;
}

/* Stretch the filler column to the same height as the nav column (three cells). */
.navwrap { align-items: stretch; }

.nav {
  display: flex;
  flex-direction: column;
}

/*
 * Each row is exactly one grid cell tall and a two-column grid whose second column starts
 * at 0 width. On hover the template animates to 75/25, so the arrow column grows in from the right.
 *
 * The solid fill hides the grid lines that would cross the words. Only the top and left
 * borders are drawn: they cover the same pixels as the grid lines there, and the
 * background grid's own next line closes the box on the right and bottom.
 */
.nav a {
  --item-colour: var(--paper);
  display: grid;
  grid-template-columns: 100% 0%;
  align-items: center;
  height: var(--grid);
  padding-inline: clamp(10px, 1.2vw, 18px);
  overflow: hidden;
  border: 0 solid var(--line);
  border-width: 1px 0 0 1px;
  color: var(--item-colour);
  background-color: var(--ink);
  cursor: crosshair;
  transition:
    grid-template-columns 0.42s var(--ease-out),
    background-color 0.26s linear,
    border-color 0.26s linear;
}

.nav a:hover,
.nav a:focus-visible {
  --item-colour: var(--item-fg);
  grid-template-columns: 75% 25%;
  background-color: var(--item-bg);
  border-color: var(--item-bg);
  outline: none;
}

.cell {
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.word {
  font-family: var(--display);
  font-variation-settings: 'wdth' 74, 'wght' 900;
  text-transform: uppercase;
  font-size: clamp(26px, 4vw, 58px);
  line-height: 0.86;
  letter-spacing: -0.025em;
  white-space: nowrap;
}

.word,
.dest,
.go {
  color: var(--item-colour);
  transition: color 0.26s linear;
}

.dest {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.7;
}

.go {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
}
.go svg {
  width: clamp(26px, 3.2vw, 44px);
  height: auto;
  flex: none;
}

@media (max-width: 860px) {
  .filler { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .nav a { transition-duration: 0.01ms; }
}
</style>
