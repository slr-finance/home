<template>
  <div>
    <app-landing-title>
      SLR token 
      <span class="text-white">includes</span>
      <template #description>
        <span class="inline-block max-w-[770px]">
          Revolutionary financial protocol operating in BSC with Auto-Compounding, Auto-Liquidity mechanisms, Auto-Investing and limitless buyback.
        </span>
      </template>
    </app-landing-title>
    <div class="grid grid-cols-3 gap-28">
      <div class="bg-gray-800 rounded-12 px-32 pt-40 pb-36">
        <ui-icon name="home-token-includes-auto-burning" size="84" />
        <p class="text-white text-22 mt-20 max-w-[300px]">Automatic burning of supply every transaction.</p>
      </div>
      <div class="bg-gray-800 rounded-12 px-32 pt-40 pb-36">
        <ui-icon name="home-token-includes-locked-liquidity" size="84" />
        <p class="text-white text-22 mt-20">Liquidity Locked forever</p>
      </div>
      <div class="bg-gray-800 rounded-12 px-32 pt-40 pb-36">
        <ui-icon name="home-token-includes-locked-liquidity-2" size="84" />
        <p class="text-white text-22 mt-20">Liquidity Locked forever</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import UiIcon from '~~/components/ui/UiIcon/UiIcon.vue'

export default defineComponent({
  components: { UiIcon },
})
</script>
