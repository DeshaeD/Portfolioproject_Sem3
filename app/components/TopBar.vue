<template>
  <div class="wrap topbar">
    <span class="tag">Deshae Dekker</span>
    <span class="tag">Frontend developer — Fontys ICT</span>
    <span class="tag co">Portfolio / {{ year }}</span>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-block: 14px;
  border-bottom: 1px solid var(--line);
}
</style>
