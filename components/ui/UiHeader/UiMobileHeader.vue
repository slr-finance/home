<template>
  <header
    class="absolute w-full h-72 px-ui-page-spacing z-header top-0 flex justify-between items-center space-x-8 bg-black bg-opacity-50 bg-opacity-60"
  >
    <div class="flex space-x-8">
      <slot name="mobile-logo"/>
      <!-- <app-header-mobile-menu class="flex-1 relative z-10 ml-8" /> -->
    </div>

    <div class="flex space-x-8">
      <!-- <app-header-mobile-token-price /> -->
      <slot name="mobile-action"/>
    </div>
  </header>
  <div id="ui-mobile-header-menu-place"/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ui-mobile-header',
    components: {

    },
  })
</script>
