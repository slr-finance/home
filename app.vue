<template>
  <app-header is-desktop/>

  <div class="relative pt-ui-page-header-spacing pb-80">
    <home-bg class="absolute left-0 top-0 w-full h-full"/>
    <div
      class="relative z-1 px-ui-page-spacing"
      style="max-width: 770px"
    >
      <h1 class="text-60 text-gray font-title leading-140 uppercase mb-24 inline-block relative">
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
      </h1>

      <p class="text-gray text-20 mb-36">
        Revolutionary financial protocol operating in BSC with Auto-Compounding, Auto-Liquidity mechanisms, Auto-Investing and limitless buyback.
      </p>

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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './index.postcss'
import './components/ui/index.postcss'
import AppHeader from './components/App/AppHeader.vue'
import HomeBg from './components/HomeBg.vue'
import UiButton from './components/ui/UiButton.vue'
import UiPoligon from './components/ui/UiPoligon.vue'

export default defineComponent({
  components: {
    HomeBg,
    AppHeader,
    UiButton,
    UiPoligon,
  }
})
</script>


<style>
body, html {
  background: black;
  padding: 0;
  margin: 0;
}

.text-box {
  text-align: left;
  left: 0;
  top: 20%;
  z-index: 2;
  font-size: 60px;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 7px;
  word-spacing: 12px;
  text-transform: uppercase;
  color:rgb(238, 238, 238);
}
.button-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  flex-direction: row;
}
.button {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  margin-left:20px;
  margin-right:20px;
  word-spacing: normal;
  letter-spacing: 5px;
  border: 1px solid white;
  background: black;
  cursor: pointer;
}
</style>