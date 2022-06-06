<template>
  <div
    class="home-milky-way-scheme-fee-item flex items-center"
    :class="classList"
  >
    <div class="icon-wrapper w-[100px] h-[100px] flex-shrink-0 bg-gray-800 rounded-12">

    </div>

    <div>
      <h4 class="text-white text-ui-page-label mb-8">{{ label }}</h4>
      <p class="text-gray text-ui-page-description leading-140"><slot/></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    accent: {
      type: Boolean,
    },
  },
  setup(props) {
    const classList = computed(() => ({ '-accent': props.accent }))

    return { classList }
  }
})
</script>

<style lang="postcss" scoped>
.home-milky-way-scheme-fee-item.-accent {
  @apply flex-col justify-center items-center text-center;
}

.home-milky-way-scheme-fee-item.-accent .icon-wrapper {
  @apply bg-violet-500 mb-20;
}

.home-milky-way-scheme-fee-item:not(.-accent) .icon-wrapper {
  @apply mr-20;
}
</style>
