<template>
  <section :id="plate.id" class="plate wrap" :aria-labelledby="headingId">
    <div class="numeral" :class="plate.numeralSide" aria-hidden="true">{{ plate.numeral }}</div>
    <div class="cross" :style="plate.cross.position" aria-hidden="true">
      +<small>{{ plate.cross.label }}</small>
    </div>

    <div class="plate-grid">
      <figure class="col" :style="{ '--col': plate.columns.media }">
        <img
          v-if="plate.media.kind === 'image'"
          class="shot"
          :src="plate.media.src"
          :alt="plate.media.alt"
          loading="lazy"
        >
        <!-- Placeholder: a crossed-out box, like a wireframe, until a real screenshot exists. -->
        <div v-else class="shot placeholder" :class="plate.media.ratio" role="img" aria-label="Image coming soon">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="0" x2="100" y2="100" />
            <line x1="100" y1="0" x2="0" y2="100" />
          </svg>
        </div>
        <figcaption class="tag">{{ plate.caption }}</figcaption>
      </figure>

      <div class="col text" :style="{ '--col': plate.columns.text, paddingTop: plate.textOffset }">
        <span v-if="plate.kicker" class="tag co">{{ plate.kicker }}</span>
        <h2 :id="headingId" class="title">
          <span
            v-for="line in plate.title"
            :key="line.text"
            class="disp ttl"
            :class="line.style"
          >{{ line.text }}</span>
        </h2>
        <p class="body">{{ plate.body }}</p>
        <ul class="meta-row" aria-label="Tools used">
          <li v-for="chip in plate.chips" :key="chip.label" class="chip" :class="{ on: chip.highlight }">
            {{ chip.label }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Plate } from '~/data/site'

const props = defineProps<{ plate: Plate }>()

const headingId = computed(() => `plate-${props.plate.numeral}-title`)
</script>

<style scoped>
.plate {
  position: relative;
  padding-block: clamp(66px, 8.5vw, 132px) clamp(26px, 4vw, 56px);
}

/* Outlined numeral sits behind the content, half under the imagery. */
.numeral {
  position: absolute;
  top: 0;
  z-index: 1;
  font-family: var(--display);
  font-variation-settings: 'wdth' 68, 'wght' 900;
  font-size: clamp(140px, 19vw, 280px);
  line-height: 0.72;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--coral);
  opacity: 0.72;
  pointer-events: none;
}
.numeral.left { left: -0.03em; }
.numeral.right { right: 3%; }

.cross {
  position: absolute;
  z-index: 1;
  font-size: 12px;
  color: var(--coral);
  opacity: 0.85;
  pointer-events: none;
}
.cross small {
  display: block;
  font-size: 10px;
  letter-spacing: 0.14em;
  margin-top: 3px;
  white-space: nowrap;
}

figure { position: relative; }
figcaption { margin-top: 10px; }

.shot {
  width: 100%;
  background: #d7d5d1;
  border: 1px solid rgb(0 0 0 / 0.25);
  transition: filter 0.3s linear;
}

/* Hover: images flip to inverted, matching the jump-nav preview. */
figure:hover img.shot { filter: invert(1); }

.placeholder { position: relative; }
.placeholder.square { aspect-ratio: 1 / 1; }
.placeholder.wide { aspect-ratio: 16 / 9; }
.placeholder.photo { aspect-ratio: 4 / 3; }

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

.title {
  display: flex;
  flex-direction: column;
  margin: 12px 0 22px;
}

.ttl {
  display: block;
  font-size: clamp(34px, 5.6vw, 86px);
  color: var(--coral);
}
.ttl.outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--paper);
}
.ttl.pale { color: var(--paper); }

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.chip {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid var(--line);
  padding: 6px 10px;
  color: var(--mute);
}
.chip.on {
  border-color: var(--coral);
  color: var(--coral);
}

@media (max-width: 860px) {
  .numeral { font-size: clamp(110px, 30vw, 190px); }
  .cross { display: none; }
  .text { padding-top: 0 !important; }
}
</style>
