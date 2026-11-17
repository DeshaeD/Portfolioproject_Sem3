<template>
  <section class="hero">
    <img
      src="/img/hero.jpg"
      alt="Black-and-white photo of a man in sunglasses holding up strands of spaghetti over a bowl"
      fetchpriority="high"
    >
    <div class="vname" aria-hidden="true"><span>Deshae Dekker</span></div>
    <div class="hero-meta tag">52.37° N / 5.22° E</div>
    <div class="hero-title">
      <h1 class="disp">Frontend<br><em>Developer</em></h1>
    </div>
  </section>
</template>

<style scoped>
/* Full width, fixed-ish height: the next section peeks in above the fold. */
.hero {
  position: relative;
  height: clamp(340px, 64vh, 640px);
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
  filter: grayscale(1) contrast(1.18) brightness(0.92);
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(44 44 44 / 0.25), rgb(44 44 44 / 0) 38%, rgb(44 44 44 / 0.45));
}

.vname {
  position: absolute;
  left: max(6px, env(safe-area-inset-left, 0px));
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 3;
}

.vname span {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--display);
  font-variation-settings: 'wdth' 62, 'wght' 900;
  font-size: clamp(28px, 5.4vw, 70px);
  line-height: 0.8;
  letter-spacing: -0.045em;
  color: var(--coral);
  text-transform: uppercase;
  white-space: nowrap;
}

.hero-title {
  position: absolute;
  right: max(20px, env(safe-area-inset-right, 0px));
  bottom: clamp(6px, 2vh, 26px);
  z-index: 3;
  text-align: right;
  max-width: calc(100% - 110px);
}

.hero-title h1 {
  font-size: clamp(38px, 7.9vw, 118px);
  color: var(--coral);
}

.hero-title h1 em {
  font-style: normal;
  color: transparent;
  -webkit-text-stroke: 2px var(--coral);
}

.hero-meta {
  position: absolute;
  right: max(22px, env(safe-area-inset-right, 0px));
  top: 18px;
  z-index: 3;
  color: var(--paper);
  mix-blend-mode: difference;
}
</style>
