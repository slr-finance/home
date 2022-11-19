<template>
  <ui-button
    rounded
    variant="gray"
    :size="64"
  >
    <ui-icon-pixel-arrow-to
      class="transform w-20 h-20"
      :class="direction === 'left' ? '-rotate-90' : 'rotate-90'"
    />
  </ui-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {UiButton, UiIconPixelArrowTo} from '@slr-finance/uikit'

export default defineComponent({
  name: 'home-road-map-scroll-button',
  props: {
    direction: {
      type: String as PropType<'left'|'right'>,
      required: true,
    },
  },
  components: {
    UiButton,
    UiIconPixelArrowTo,
  }
})
</script>

<style scoped>

</style>