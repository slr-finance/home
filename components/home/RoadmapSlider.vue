<template>
  <div class="relative pt-ui-page-header-spacing pb-80">
    <h2 class="mb-32 font-title text-gray text-60">
      WHERE ARE WE IN <span class="text-white">THE ROADMAP?</span>
    </h2>
    <div class="flex mb-[100px]">
      <div class="text-[34px] font-title flex-shrink-0 mr-64">
        <h4 class="text-gray">Current status:</h4>
        <h4 class="text-white">Rersricted mainnet</h4>
      </div>
      <p class="text-20 text-gray">Full Mainnet begins with successful completion of the final launch phase. This begins when the community have signalled their confidence in the software via on-chain governance votes and all remaining temporary limits have been removed.</p>
    </div>
    <div class="absolute w-full h-2 bg-white" />
    <div class="flex justify-between items-center pt-32">
      <button class="w-64 h-64 rounded-full flex items-center justify-center bg-gray-800 shrink-0" @click="changeScroll('left')">
        <ui-icon name="arrow-pixel-to" :size="20" class="text-white transform rotate-90"/>
      </button>
      <div ref="wrapper" class="flex 420:space-x-[76px] overflow-x-auto snap-x absolute left-[72px] right-[72px] items-center h-[218px]">
        <div class="slide">
          <ui-icon class="absolute -top-[80px]" name="flag" size="54" />
          <span class="text-gray text-18">Current status</span>
          <span class="text-18 text-white">Rersricted mainnet</span>
        </div>
        <div class="slide">
          <ui-icon class="absolute -top-[52px]" name="star-pixel" />
          <span class="text-gray text-18">Current status</span>
          <span class="text-18 text-white">Rersricted mainnet</span>
        </div>
        <div class="slide">
          <ui-icon class="absolute -top-[52px]" name="star-pixel" />
          <span class="text-gray text-18">Current status</span>
          <span class="text-18 text-white">Rersricted mainnet</span>
        </div>
        <div class="slide">
          <ui-icon class="absolute -top-[52px]" name="star-pixel" />
          <span class="text-gray text-18">Current status</span>
          <span class="text-18 text-white">Rersricted mainnet</span>
        </div>
        <div class="slide">
          <ui-icon class="absolute -top-[52px]" name="star-pixel" />
          <span class="text-gray text-18">Current status</span>
          <span class="text-18 text-white">Rersricted mainnet</span>
        </div>
        <div class="slide">
          <ui-icon class="absolute -top-[52px]" name="star-pixel" />
          <span class="text-gray text-18">Current status</span>
          <span class="text-18 text-white">Rersricted mainnet</span>
        </div>
      </div>
      <button class="w-64 h-64 rounded-full flex items-center justify-center bg-gray-800 shrink-0" @click="changeScroll('right')">
        <ui-icon name="arrow-pixel-to" :size="20" class="text-white transform -rotate-90"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import UiIcon from '~~/components/ui/UiIcon/UiIcon.vue'
import AppLandingTitle from '../App/AppLandingTitle.vue';

type TDirection = 'right' | 'left'

const ITEM_WIDTH = 162;
const GAP = 76;
const MOBILE_WIDTH = 420;

export default defineComponent({
  name: 'home-roadmap-slider',
  components: { UiIcon, AppLandingTitle },
  setup() {
    const wrapper = ref<HTMLDivElement>(null)
    let idx = 0

    const changeScrollOnDesktop = (direction: TDirection) => {
      const visibleElements = Math.floor(wrapper.value.clientWidth / (ITEM_WIDTH + GAP))
  
      if (direction === 'right') {
        idx = Math.min(
          wrapper.value.children.length - 1,
          idx === 0 ? visibleElements + 1 : idx + 1
        )
      } else {
        idx = Math.max(
          0,
          idx === wrapper.value.children.length - 1 ? idx - visibleElements - 1 : idx - 1
        )
      }
    }

    const changeScrollOnMobile = (direction: TDirection) => {
      idx = Math.min(wrapper.value.children.length - 1, Math.max(idx + (direction === 'right' ? 1 : -1), 0))
    }

    const changeScroll = (direction: TDirection) => {
      if (window.innerWidth > MOBILE_WIDTH) {
        changeScrollOnDesktop(direction);
      } else {
        changeScrollOnMobile(direction)
      }
      wrapper.value.children[idx]?.scrollIntoView({ behavior: 'smooth' })
    }

    return {
      wrapper,
      idx,
      changeScroll
    }
  },
})
</script>

<style scoped lang="postcss">
.slide {
  @apply flex flex-col items-center shrink-0 relative snap-start 420:w-auto w-full;
}
</style>
