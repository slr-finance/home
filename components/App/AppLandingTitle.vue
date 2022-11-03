<template>
  <div class="relative">
    <app-section-title
      class="text-ui-page-large-title font-title leading-140 uppercase mb-24"
      :text="text"
    />
    <slot/>
    <p class="text-gray text-ui-page-large-label mb-36 selection:bg-green-atomic selection:text-black">
      <slot name="description"/>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSectionTitle from './AppSectionTitle.vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    }
  },
  components: { AppSectionTitle },
})
</script>
