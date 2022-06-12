<template>
  <div class="home-screenshot bg-gray-400 bg-opacity-50 relative rounded-20 overflow-hidden pointer-events-none select-none">
    <picture>
      <source srcset="/home/screenshot/bg1x.webp 1x, /home/screenshot/bg2x.webp 2x" type="image/webp">
      <source srcset="/home/screenshot/bg1x.jpg 1x, /home/screenshot/bg2x.jpg 2x" type="image/jpeg">
      <img
        class="img w-full h-full rounded-20 border-4 border-gray-600"
        decoding="async"
        loading="lazy"
        src="/home/screenshot/bg1x.jpg"
      >
    </picture>
  </div>
</template>

<style lang="postcss" scoped>
.home-screenshot {
  aspect-ratio: 1340 / 639;
}

.home-screenshot::after {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 82%);
  content: '';
  height: 78%;
  @apply w-full absolute bottom-0 left-0;
}

.home-screenshot .img,
.home-screenshot::after {
  content-visibility: auto;
  @apply block;
}
</style>