<template>
  <div class="plate-grid navwrap">
    <div class="col" style="--col: 1 / span 6">
      <p class="tag co label">Jump to —</p>
      <nav class="nav" aria-label="Section shortcuts">
        <!-- Plain <a>, not <NuxtLink>: these are in-page hash jumps, not route changes. -->
        <a
          v-for="(link, i) in links"
          :key="link.href"
          :href="link.href"
          :style="{ '--item-bg': link.bg, '--item-fg': link.fg }"
          @mouseenter="active = i"
          @mouseleave="active = null"
          @focus="active = i"
          @blur="active = null"
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

    <div class="col preview" style="--col: 8 / span 5" aria-hidden="true">
      <div class="viewer">
        <span class="empty" :class="{ hidden: active !== null }">[ no section selected ]</span>
        <div
          v-for="(link, i) in links"
          :key="link.href"
          class="vshot"
          :class="{ visible: active === i }"
          :style="link.preview ? { backgroundImage: `url(${link.preview})` } : { background: '#d9d7d3' }"
        />
      </div>
      <p class="tag caption">Preview — colours inverted</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JumpLink } from '~/data/site'

defineProps<{ links: JumpLink[] }>()

// Index of the row being hovered or focused; null shows the empty state.
const active = ref<number | null>(null)
</script>

<style scoped>
.label { margin-bottom: 14px; }

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

.preview { padding-top: clamp(18px, 3vw, 42px); }

.viewer {
  position: relative;
  aspect-ratio: 4 / 3;
  border: 1px solid var(--line);
  background: var(--ink-deep);
  overflow: hidden;
  display: grid;
  place-items: center;
}

.empty {
  z-index: 1;
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--mute);
  transition: opacity 0.26s linear;
}
.empty.hidden { opacity: 0; }

.vshot {
  position: absolute;
  inset: 0;
  opacity: 0;
  background-size: cover;
  background-position: 50% 30%;
  filter: invert(1);
  transition: opacity 0.34s linear;
}
.vshot.visible { opacity: 1; }

.caption { margin-top: 10px; }

@media (max-width: 860px) {
  .preview { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .nav a,
  .vshot,
  .empty { transition-duration: 0.01ms; }
}
</style>
