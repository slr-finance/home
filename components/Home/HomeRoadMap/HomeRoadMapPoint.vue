<template>
  <li class="home-roadmap-point -desktop">
    <div class="icon-wrapper">
      <component :is="iconData.componentName" v-bind="iconData.props"/>
    </div>
    <div class="text-gray">{{ status }}</div>
    <div class="whitespace-pre-wrap">{{ label }}</div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UiIconPixelCenter, UiIconPixelFlag } from '@slr-finance/uikit'

export type RoadmapPointType = 'end'|'last'|'wait'

export default defineComponent({
  props: {
    status: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<RoadmapPointType>,
      required: true,
    },
  },
  setup(props) {
    const iconData = computed(() => {
      const { type } = props
      
      if (type === 'last') {
        return {
          componentName: 'UiIconPixelFlag',
          props: {
            class: 'icon w-20 h-50 text-violet',
            style: 'transform: translateX(7px);'
          }
        }
      }

      return {
          componentName: 'UiIconPixelCenter',
          props: {
            class: 'icon w-20 h-20 text-white'
          }
        }
    })

    return { iconData }
  },
  components: {
    UiIconPixelCenter,
    UiIconPixelFlag,
  }
})
</script>


<style scoped>
.home-roadmap-point {
  @apply text-center text-ui-page-label pt-32 flex flex-col items-center snap-start;
}

.home-roadmap-point > .icon-wrapper {
  @apply bg-black w-32 h-64 flex justify-center items-end;
  padding-bottom: 4px;
  margin-bottom: 24px;
}

.home-roadmap-point.-desktop > .icon-wrapper > .icon {

}
</style>