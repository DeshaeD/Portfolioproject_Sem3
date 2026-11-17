<template>
  <section
    :id="plate.id"
    ref="root"
    class="plate wrap"
    :style="{ minHeight }"
    :aria-labelledby="headingId"
  >
    <FitText class="numeral" :class="plate.numeralSide" :text="plate.numeral" outline />
    <!-- The + sits on a grid line: x/y are whole cells measured from the plate's corner. -->
    <div class="cross" :style="crossPosition" aria-hidden="true">
      <small>{{ plate.cross.label }}</small>
    </div>

    <div ref="content" class="content">
      <div class="plate-grid">
        <figure class="col" :style="{ '--col': plate.columns.media, '--ratio': plate.ratio }">
          <img
            v-if="plate.media.kind === 'image'"
            class="shot"
            :src="plate.media.src"
            :alt="plate.media.alt"
            loading="lazy"
          >
          <!-- Placeholder: a crossed-out box, like a wireframe, until a real screenshot exists. -->
          <div v-else class="shot placeholder" role="img" aria-label="Image coming soon">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="0" x2="100" y2="100" />
              <line x1="100" y1="0" x2="0" y2="100" />
            </svg>
          </div>
          <figcaption class="tag">{{ plate.caption }}</figcaption>
        </figure>

        <div class="col text" :style="{ '--col': plate.columns.text, '--offset': plate.textOffset }">
          <div class="head">
            <span v-if="plate.kicker" class="tag co kicker">{{ plate.kicker }}</span>
            <h2 :id="headingId" class="title">
              <!-- The SVG letters are hidden from screen readers; this is the heading they read. -->
              <span class="sr-only">{{ plate.title.map(line => line.text).join(' ') }}</span>
              <FitText
                v-for="line in plate.title"
                :key="line.text"
                class="ttl"
                :class="line.style"
                :text="line.text"
                :outline="line.style === 'outline'"
              />
            </h2>
          </div>

          <!-- Snapped to whole cells, so the chips below start on a grid line. -->
          <div ref="bodyBox" :style="{ minHeight: bodyMinHeight }">
            <div ref="bodyContent" class="body-inner">
              <p class="body">{{ plate.body }}</p>
            </div>
          </div>

          <ul class="meta-row" aria-label="Tools used">
            <li v-for="chip in plate.chips" :key="chip.label" class="chip" :class="{ on: chip.highlight }">
              {{ chip.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Plate } from '~/data/site'

const props = defineProps<{ plate: Plate }>()

const headingId = computed(() => `plate-${props.plate.numeral}-title`)

const crossPosition = computed(() => ({
  left: `calc(var(--grid) * ${props.plate.cross.x})`,
  top: `calc(var(--grid) * ${props.plate.cross.y})`,
}))

// Vue 3.5: useTemplateRef('root') connects to the element with ref="root".
const minHeight = useGridSnap(useTemplateRef<HTMLElement>('root'), useTemplateRef<HTMLElement>('content'))
const bodyMinHeight = useGridSnap(useTemplateRef<HTMLElement>('bodyBox'), useTemplateRef<HTMLElement>('bodyContent'))
</script>

<style scoped>
.plate { position: relative; }

/*
 * Starts one cell below the plate's top line and leaves at least half a cell below;
 * useGridSnap then rounds the total up to whole cells.
 * flow-root keeps children's margins inside this box, so the measured height is the real one.
 */
.content {
  display: flow-root;
  padding-block: var(--grid) calc(var(--grid) / 2);
}

/*
 * Outlined numeral behind the content: exactly two cells tall, and as wide as its letters
 * need rounded to whole cells, so all four sides of the digits sit on grid lines.
 * --aspect comes from FitText (letter width / height).
 */
.numeral {
  position: absolute;
  top: 0;
  z-index: 1;
  height: calc(var(--grid) * 2);
  width: max(var(--grid), round(nearest, var(--grid) * 2 * var(--aspect), var(--grid)));
  color: var(--coral);
  opacity: 0.72;
  pointer-events: none;
}
.numeral.left { left: 0; }
.numeral.right { right: 0; }

/*
 * A zero-size anchor at the grid point. The two 1px strokes start at the anchor,
 * so they cover the same pixels as the background line they sit on.
 */
.cross {
  position: absolute;
  z-index: 1;
  width: 0;
  height: 0;
  color: var(--coral);
  pointer-events: none;
}
.cross::before,
.cross::after {
  content: '';
  position: absolute;
  background: currentColor;
}
.cross::before { left: -6px; top: 0; width: 13px; height: 1px; }
.cross::after { left: 0; top: -6px; width: 1px; height: 13px; }

.cross small {
  position: absolute;
  left: 10px;
  top: 7px;
  font-size: 10px;
  letter-spacing: 0.14em;
  white-space: nowrap;
  opacity: 0.85;
}

figure { position: relative; }

/* Hangs below the image instead of adding height, so the image's bottom edge stays the block's edge. */
figcaption {
  position: absolute;
  top: 100%;
  margin-top: 10px;
}

/* Width is the column span; the ratio makes the height a whole number of cells too. */
.shot {
  width: 100%;
  aspect-ratio: var(--ratio);
  object-fit: cover;
  background: #d7d5d1;
}

.placeholder { position: relative; }

.placeholder svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.placeholder line {
  stroke: rgb(0 0 0 / 0.18);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.text { padding-top: calc(var(--grid) * var(--offset)); }

/* The kicker hangs above the title, so the title's first line starts on the grid line. */
.head { position: relative; }
.kicker {
  position: absolute;
  bottom: 100%;
  margin-bottom: 12px;
  white-space: nowrap;
}

.title { display: flex; flex-direction: column; }

/*
 * Each title line is one cell tall: cap height on one line, baseline on the next.
 * Width is the letters' natural width rounded to whole cells (stretched or squeezed a
 * little), and a line too long for its column is squeezed to fit.
 */
.ttl {
  height: var(--grid);
  width: min(100%, max(var(--grid), round(nearest, var(--grid) * var(--aspect), var(--grid))));
  color: var(--coral);
}
.ttl.outline { color: var(--paper); }
.ttl.pale { color: var(--paper); }

.body-inner {
  display: flow-root;
  padding-block: 22px 26px;
}

/*
 * Chips: half a cell tall and a whole number of cells wide, starting on a grid line.
 * calc-size() rounds the chip's natural width up to whole cells (Chrome/Edge; other
 * browsers keep the natural width). The fill hides grid lines crossing the label; the top
 * and left borders cover the grid lines exactly, and the next line closes the right side.
 */
.meta-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
}

.chip {
  display: flex;
  align-items: center;
  height: calc(var(--grid) / 2);
  width: calc-size(fit-content, round(up, size, var(--grid)));
  padding-inline: 10px;
  background: var(--ink);
  border: 0 solid var(--line);
  border-width: 1px 0 1px 1px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--mute);
}
.chip.on {
  border-color: var(--coral);
  border-right-width: 1px;
  color: var(--coral);
}

/* Mobile: media is the full 6-cell frame, 4 cells tall; the caption hangs in the cell below it. */
@media (max-width: 860px) {
  .cross { display: none; }
  .shot { aspect-ratio: 6 / 4; }
  .text { padding-top: calc(var(--grid) * 2); }
}
</style>
