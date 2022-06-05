<template>
  <div>
    <home-hero/>

    <div class="mx-ui-page-spacing">
      <home-milky-way-scheme/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiButton from '../components/ui/UiButton.vue'
import UiPoligon from '../components/ui/UiPoligon.vue'

export default defineComponent({
  layout: 'default',
  components: {
    UiButton,
    UiPoligon,
  }
})
</script>
