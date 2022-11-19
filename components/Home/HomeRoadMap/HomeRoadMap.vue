<template>
  <section>
    <app-landing-title text="Where are we in |the roadmap?|">
      <template #description>
        <div class="flex">
          <div class="font-title text-white whitespace-nowrap mr-32 text-[32px]">
            <div class="text-gray">
              Current status: 
            </div>
            Rersricted mainnet
          </div>
          <div>
            Full Mainnet begins with successful completion of the final launch phase. This begins when the community have signalled their confidence in the software via on-chain governance votes and all remaining temporary limits have been removed. 
          </div>
        </div>
      </template>
    </app-landing-title>

    <home-road-map-scroll/>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeRoadMapScroll from './HomeRoadMapScroll.vue'

export default defineComponent({
  setup() {
    
  },
  components: {
    HomeRoadMapScroll,
  }
})
</script>
