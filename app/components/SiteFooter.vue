<template>
  <footer class="wrap">
    <div id="contact" class="plate-grid contact">
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

    <JumpNav :links="jumpLinks" class="jump" />

    <div class="footbar">
      <span class="tag">© {{ year }} Deshae Dekker</span>
      <span class="tag co">End of document</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { contact, jumpLinks } from '~/data/site'

const year = new Date().getFullYear()
</script>

<style scoped>
footer {
  position: relative;
  padding-top: clamp(50px, 8vw, 110px);
  margin-top: clamp(40px, 6vw, 90px);
  border-top: 1px solid var(--line);
}

.contact { margin-top: clamp(26px, 4vw, 52px); }

.big {
  font-size: clamp(15px, 1.5vw, 21px);
  margin-top: 6px;
}

.links { display: flex; gap: 1.2em; }
.gap { margin-top: 20px; }

.jump { margin-top: clamp(40px, 6vw, 86px); }

.footbar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  padding-block: 18px;
  margin-top: clamp(30px, 5vw, 60px);
  border-top: 1px solid var(--line);
}
</style>
