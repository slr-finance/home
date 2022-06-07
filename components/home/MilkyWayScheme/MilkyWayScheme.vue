<template>
  <div
    class="relative"
    ref="root"
  >
    <client-only>
      <lazy-home-milky-way-scheme-path
        class="absolute inset-0 w-full h-full"
        :stroke-width="10"
        :show="isIntersecting"
        :elements-positions="elementsPositions"
      />
    </client-only>
    <div class="grid grid-cols-3 gap-y-0 gap-x-48 relative z-1" style="grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto minmax(0, 1fr)">
      <app-landing-title class="col-span-2 row-span-2" style="max-width:700px;">
        Limitless 
        <span class="text-white">buyback</span>
        and
        <span class="text-white">investing</span>

        <template #description>
          Unique multi-level staking. Discover new planets and increase APY to 1,017.56%.
          Earn with auto compounding with a large fixed APY.
        </template>
      </app-landing-title>

      <div
        class="row-span-3 flex flex-col space-y-24 justify-between items-stretch"
        ref="feesWrapper"
      >
        <home-milky-way-scheme-fee-item
          ref="feesItem0"
          label="Swap fees"
          icon-name="home-milkyway-staking"
          :column="isSmall"
        >
          Quickly enable full user lifecycle management by syncing your app 1
        </home-milky-way-scheme-fee-item>
        <home-milky-way-scheme-fee-item
          ref="feesItem1"
          label="Staking withdrawal fees"
          icon-name="home-milkyway-swap"
          :column="isSmall"
        >
          Quickly enable full user lifecycle management by syncing your app 2
        </home-milky-way-scheme-fee-item>
        <home-milky-way-scheme-fee-item
          ref="feesItem2"
          label="Transfer fees"
          icon-name="home-milkyway-swap"
          :column="isSmall"
        >
          Quickly enable full user lifecycle management by syncing your app 3
        </home-milky-way-scheme-fee-item>
      </div>

      <div class="row-start-5 flex items-center" ref="invest">
        <home-milky-way-scheme-fee-item
          ref="investComponent"
          label="Invest"
          icon-name="home-milkyway-swap"
          bage="Auto"
        >
          Quickly enable full user lifecycle management by syncing your app 4
        </home-milky-way-scheme-fee-item>
      </div>

      <home-milky-way-scheme-planet ref="milkyWay"/>

      <div
        ref="buyBack"
        class="col-span-3 row-span-2 pt-64 justify-self-center"
      >
        <home-milky-way-scheme-fee-item
          accent
          column
          label="Buy back and burn liquidity"
          icon-name="home-milkyway-swap"
        >
          Quickly enable full user lifecycle management by syncing your app 5
        </home-milky-way-scheme-fee-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { templateRef, useIntersectionObserver, useResizeObserver } from '@vueuse/core'
import  MilkyWaySchemeFeeItem from './MilkyWaySchemeFeeItem.vue'
import  MilkyWaySchemePlanet from './MilkyWaySchemePlanet.vue'

const defaultElPosition = { x: 0, y: 0, w: 0, h: 0 }

const getElPosition = (rootX: number, rootY: number, el: HTMLElement|SVGElement) => {
  const elDOMRect = el.getBoundingClientRect()

  return {
    x: elDOMRect.x - rootX,
    y: elDOMRect.y - rootY,
    w: elDOMRect.width,
    h: elDOMRect.height,
  }
} 

export default defineComponent({
  name: 'home-milky-way-scheme',
  setup() {
    const isIntersecting = ref(false)
    const isSmall = ref(true)
    const rootRef = templateRef('root')
    const feesWrapperRef = templateRef('feesWrapper')
    const milkyWayRef = templateRef('milkyWay') as any as Readonly<Ref<typeof MilkyWaySchemePlanet>>
    const investRef = templateRef('invest')
    const investComponentRef = templateRef('investComponent') as any as Readonly<Ref<typeof MilkyWaySchemeFeeItem>>
    const buyBacktRef = templateRef('buyBack')
    const feesItemRefs = [
      templateRef('feesItem0') as any as Readonly<Ref<typeof MilkyWaySchemeFeeItem>>,
      templateRef('feesItem1') as any as Readonly<Ref<typeof MilkyWaySchemeFeeItem>>,
      templateRef('feesItem2') as any as Readonly<Ref<typeof MilkyWaySchemeFeeItem>>
    ]

    const elementsPositions = ref({
      feesWrapper: defaultElPosition,
      milkyWay: defaultElPosition,
      invest: defaultElPosition,
      investIconWrap: defaultElPosition,
      buyBack: defaultElPosition,
      feesItems: [defaultElPosition, defaultElPosition, defaultElPosition]
    })

    const updatePositions = () => {
      const { x: rootX, y: rootY } = rootRef.value.getBoundingClientRect()

      elementsPositions.value = {
        feesWrapper: getElPosition(rootX, rootY, feesWrapperRef.value),
        milkyWay: getElPosition(rootX, rootY, milkyWayRef.value.$el),
        invest: getElPosition(rootX, rootY, investRef.value),
        investIconWrap: getElPosition(rootX, rootY, investComponentRef.value.iconWrapperRef),
        buyBack: getElPosition(rootX, rootY, buyBacktRef.value),
        feesItems: feesItemRefs.map((component) => getElPosition(rootX, rootY, component.value.iconWrapperRef))
      }
    }

    useResizeObserver(rootRef, ([{ contentRect: { width }}]) => {
      isSmall.value = width < 900

      updatePositions()
    })

    useIntersectionObserver(
      computed(() => milkyWayRef.value?.$el),
      ([entry]) => { 
        if (entry.isIntersecting) {
          isIntersecting.value = true
        }
      },
      { threshold: 1 },
    )

    return { elementsPositions, isIntersecting, isSmall }
  },
})
</script>
