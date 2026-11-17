<template>
  <div class="readout" aria-hidden="true">Y {{ pad(y, 4) }} / {{ pad(percent, 2) }}%</div>
</template>

<script setup lang="ts">
const { y, percent } = useScrollProgress()

const pad = (n: number, width: number) => String(n).padStart(width, '0')
</script>

<style scoped>
.readout {
  position: fixed;
  z-index: 5;
  right: calc(10px + env(safe-area-inset-right, 0px));
  bottom: calc(10px + env(safe-area-inset-bottom, 0px));
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--coral);
  background: rgb(22 22 22 / 0.84);
  border: 1px solid rgb(255 111 111 / 0.35);
  padding: 5px 8px;
  font-variant-numeric: tabular-nums;
}
</style>
