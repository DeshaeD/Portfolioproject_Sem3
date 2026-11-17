<template>
  <div class="plate-grid navwrap">
    <div class="col" style="--col: 1 / span 6">
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

    <div class="col filler" style="--col: 8 / span 5">
      <PosterFiller />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JumpLink } from '~/data/site'

defineProps<{ links: JumpLink[] }>()
</script>

<style scoped>
.label { margin-bottom: 14px; }

/* Stretch the filler column to the same height as the nav column. */
.navwrap { align-items: stretch; }
.filler { padding-top: 29px; }

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/*
 * Each row is a two-column grid whose second column starts at 0 width.
 * On hover the template animates to 75/25, so the arrow column grows in from the right.
 */
.nav a {
  --item-colour: var(--paper);
  display: grid;
  grid-template-columns: 100% 0%;
  align-items: center;
  height: clamp(70px, 8.4vw, 104px);
  padding-inline: clamp(10px, 1.2vw, 18px);
  overflow: hidden;
  border: 1px solid var(--line);
  color: var(--item-colour);
  background-color: transparent;
  cursor: crosshair;
  transition:
    grid-template-columns 0.42s var(--ease-out),
    height 0.42s var(--ease-out),
    background-color 0.26s linear,
    border-color 0.26s linear;
}

.nav a:hover,
.nav a:focus-visible {
  --item-colour: var(--item-fg);
  grid-template-columns: 75% 25%;
  height: clamp(96px, 12vw, 148px);
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
  font-size: clamp(30px, 4.3vw, 62px);
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
