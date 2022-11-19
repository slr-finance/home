<template>
  <div>
    <home-hero/>
    <!-- <SlrHeader></SlrHeader> -->

    <div class="mx-ui-page-spacing space-y-[200px]">
      <home-screenshot/>
      <home-token-description/>
      <home-staking-description/>
      <home-milky-way-scheme/>
      <home-road-map/>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'DEFI 3.0 Yield Farming'
})
</script>
