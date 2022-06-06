<template>
  <div class="relative pt-ui-page-header-spacing pb-80">
    <client-only>
      <lazy-landing-grid-bg class="absolute left-0 top-0 w-full h-full"/>
    </client-only>

    <div class="px-ui-page-spacing">
      <div
        class="relative z-1 mt-48"
        style="max-width: 700px"
      >
        <app-landing-title>
           DeFi 3.0 planets system with 
          <span class="text-white">invest & burning</span>
          <ui-poligon
            animated
            size="64"
            variant="green-atomic"
            class=" absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2"
          >
            Presale
          </ui-poligon>

          <template #description>
            Revolutionary financial protocol operating in BSC with Auto-Compounding, Auto-Liquidity mechanisms, Auto-Investing and limitless buyback.
          </template>
        </app-landing-title>
  
        <div class="inline-grid grid-cols-2 gap-12">
          <ui-button
            size="48"
            variant="violet"
            href="https://app.slr.finance/presale"
          >
            Join in presale whitelist
          </ui-button>
  
          <ui-button
            size="48"
            variant="gray"
            href="https://app.slr.finance/referral"
          >
            Referral program
          </ui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({ name: 'home-hero' })
</script>
