<template>
  <footer class="wrap">
    <!-- Snapped to whole cells, so the jump nav below starts on a grid line. -->
    <div ref="contactBox" :style="{ minHeight }">
      <div id="contact" ref="contactContent" class="plate-grid contact">
        <h2 class="sr-only">Contact</h2>
        <div class="col" style="--col: 1 / span 5">
          <p class="body">
            Looking for an internship from February. Happy to talk about interfaces, grids, or whether that spaghetti was worth it.
          </p>
        </div>
        <div class="col" style="--col: 8 / span 5">
          <p class="tag">Mail</p>
          <p class="big"><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p>
          <p class="tag gap">Elsewhere</p>
          <p class="big links">
            <a v-for="link in contact.links" :key="link.href" :href="link.href" target="_blank" rel="noopener">
              {{ link.label }}
            </a>
          </p>
        </div>
      </div>
    </div>

    <JumpNav :links="jumpLinks" />

    <div class="footbar">
      <span class="tag">© {{ year }} Deshae Dekker</span>
      <span class="tag co">End of document</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { contact, jumpLinks } from '~/data/site'

const year = new Date().getFullYear()

const minHeight = useGridSnap(useTemplateRef<HTMLElement>('contactBox'), useTemplateRef<HTMLElement>('contactContent'))
</script>

<style scoped>
footer { position: relative; }

/* One cell above, at least one below: room for the "Jump to" label that hangs above the nav. */
.contact { padding-block: var(--grid); }

.big {
  font-size: clamp(15px, 1.5vw, 21px);
  margin-top: 6px;
}

.links { display: flex; gap: 1.2em; }
.gap { margin-top: 20px; }

.footbar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  padding-block: 18px;
  margin-top: var(--grid);
}
</style>
