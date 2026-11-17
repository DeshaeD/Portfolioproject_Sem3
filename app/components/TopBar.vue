<template>
  <div class="wrap topbar">
    <span class="tag">Deshae Dekker</span>
    <span class="tag mid">Frontend developer — Fontys ICT</span>
    <span class="tag co">Portfolio / {{ year }}</span>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
/* Fixed height: the background grid's first line is placed at exactly var(--topbar). */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: var(--topbar);
  white-space: nowrap;
}

/* One line only, or the bar would grow past --topbar and push the hero off the grid. */
@media (max-width: 860px) {
  .mid { display: none; }
}
</style>
