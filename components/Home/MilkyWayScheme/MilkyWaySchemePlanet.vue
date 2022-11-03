<template>
  <div
    class="relative flex justify-center items-center justify-self-center self-center aspect-1 selection:bg-green-atomic selection:text-black select-none"
    style="max-width:340px; width: 95%; content-visibility: auto;"
    ref="milkyWay"
  >
    <video
      autoplay
      loop
      muted
      playsinline
      disablePictureInPicture
      class="w-full aspect-1"
      :class="{ 'opacity-0': !isShownWideo }"
      src="/home/wilkyWay/planet2x.webm"
      @canplay="oncanplay"
    />

    ​<picture v-if="!isShownWideo">
      <source srcset="/home/wilkyWay/planet1x.webp 1x, /home/wilkyWay/planet2x.webp 2x" type="image/webp">
      <source srcset="/home/wilkyWay/planet1x.png 1x, /home/wilkyWay/planet2x.png 2x" type="image/png">
      <img
        loading="lazy"
        decoding="async"
        src="/home/wilkyWay/planet1x.png"
        alt=""
        class="w-full aspect-1 absolute inset-0 z-1"
      />
    </picture>

    <div class="absolute inset-0 z-10 flex justify-center items-center text-center text-ui-page-label font-title">
      tmp video.
      Milkyway <br> protocol
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'home-milky-way-scheme-planet',
  setup() {
    const isShownWideo = ref(false)

    const oncanplay = () => {
      isShownWideo.value = true
    }

    return { isShownWideo, oncanplay }
  },
})
</script>
