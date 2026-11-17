<template>
  <div>
    <TopBar />
    <HeroSection />
    <MarqueeStrip :words="strips.roles" variant="coral" />

    <ProjectPlate :plate="about" />

    <div id="work">
      <template v-for="(project, i) in projects" :key="project.numeral">
        <ProjectPlate :plate="project" />
        <!-- One motto strip after the first project; plain rules between the rest. -->
        <MarqueeStrip v-if="i === 0" :words="strips.motto" variant="dark" separator="—" :repeat="6" />
        <div v-else-if="i < projects.length - 1" class="rule wrap" />
      </template>
    </div>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { about, projects, strips } from '~/data/site'
</script>
