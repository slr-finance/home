<template>
  <div
    class="relative"
    ref="root"
    style="height: 1000px;"
  >
    <div class=" grid grid-cols-3 gap-24">
      <div class="h-80 bg-gray-800 rounded-12">1</div>
      <div class="h-80 bg-gray-800 rounded-12">2</div>
      <div class="h-80 bg-gray-800 rounded-12">3</div>
    </div>
    <client-only>
      <lazy-home-milky-way-scheme-path
        class="absolute inset-0 w-full h-full"
        :stroke-width="10"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { templateRef, useIntersectionObserver } from '@vueuse/core'

export default defineComponent({
  name: 'milky-way-scheme',
  setup() {
    const target = templateRef('root')
    const targetIsVisible = ref(false)

    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        targetIsVisible.value = isIntersecting
      },
    )
  },
})
</script>
