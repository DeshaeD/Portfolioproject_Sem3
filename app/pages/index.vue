<template>
  <div>
    <TopBar />
    <HeroSection />
    <MarqueeStrip :words="strips.roles" variant="coral" />

    <ProjectPlate :plate="about" />

    <div id="work">
      <p v-if="error" class="wrap tag co status">Projects could not be loaded right now.</p>

      <template v-for="(plate, i) in plates" :key="plate.numeral">
        <ProjectPlate :plate="plate" />
        <!-- One motto strip after the first project; plain rules between the rest. -->
        <MarqueeStrip v-if="i === 0" :words="strips.motto" variant="dark" separator="dash" :repeat="6" />
        <div v-else-if="i < plates.length - 1" class="rule wrap" />
      </template>
    </div>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { about, strips } from '~/data/site'

// Runs on the server during SSR; the result is sent along with the HTML, so the browser doesn't fetch it twice.
const { data: projects, error } = await useFetch('/api/projects', {
  default: () => [],
})

const plates = computed(() => projects.value.map(projectToPlate))
</script>

<style scoped>
.status { padding-block: 40px; }
</style>
