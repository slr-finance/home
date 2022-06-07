<template>
  <div
    class="home-milky-way-scheme-fee-item flex"
    :class="classList"
  >
    <div
      class="icon-wrapper flex-shrink-0 bg-gray-800 p-8 rounded-12 flex justify-center items-center relative"
      ref="iconWrapperRef"
    >
      <ui-icon
        :name="iconName"
        class="w-full h-full icon"
      />

      <ui-poligon
        v-if="bage"
        class="absolute right-0 top-0 transform translate-x-16 -translate-y-24"
        variant="yellow"
      >
        {{ bage }}
      </ui-poligon>
    </div>

    <div>
      <h4 class="text-white text-ui-page-label mb-8 selection:bg-green-atomic selection:bg-opacity-50 selection:text-white">{{ label }}</h4>
      <p class="text-gray text-ui-page-description leading-140 selection:bg-green-atomic selection:text-black"><slot/></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiIcon from '~~/components/ui/UiIcon/UiIcon.vue'
import UiPoligon from '~~/components/ui/UiPoligon.vue'

export default defineComponent({
  components: { UiIcon, UiPoligon },
  name: 'milky-way-scheme-fee-item',
  props: {
    label: {
      type: String,
      required: true,
    },
    accent: {
      type: Boolean,
    },
    column: {
      type: Boolean,
    },
    iconName: {
      type: String,
      required: true,
    },
    bage: {
      type: String,
    }
  },
  setup(props) {
    const iconWrapperRef = ref(null as null|HTMLElement)
    const classList = computed(() => ({ '-accent': props.accent, '-column': props.column }))

    return { classList, iconWrapperRef }
  }
})
</script>

<style lang="postcss" scoped>
.home-milky-way-scheme-fee-item {
  max-width: 400px;
}

.home-milky-way-scheme-fee-item .icon-wrapper .icon {
  content-visibility: auto;
}

.home-milky-way-scheme-fee-item.-column {
  @apply flex-col justify-center;
}

.home-milky-way-scheme-fee-item.-column .icon-wrapper {
  @apply mb-20;
}

.home-milky-way-scheme-fee-item.-accent {
  @apply items-center text-center;
}

.home-milky-way-scheme-fee-item.-accent .icon-wrapper {
  @apply bg-violet-500;
}

.home-milky-way-scheme-fee-item:not(.-column) .icon-wrapper {
  @apply mr-20;
}

.home-milky-way-scheme-fee-item:not(.-column) {
  @apply items-center;
}

.home-milky-way-scheme-fee-item .icon-wrapper {
  width: 100px;
  height: 100px;
}

@media only screen and (max-width: 1200px) {
  .home-milky-way-scheme-fee-item .icon-wrapper {
    width: 90px;
    height: 90px;
  }
}

@media only screen and (max-width: 1100px) {
  .home-milky-way-scheme-fee-item .icon-wrapper {
    width: 80px;
    height: 80px;
  }
}

@media only screen and (max-width: 1000px) {
  .home-milky-way-scheme-fee-item .icon-wrapper {
    width: 70px;
    height: 70px;
  }
}
</style>
