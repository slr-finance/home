<template>
  <div class="home-roadmap-scroll -desktop">
    <div class="button -left">
      <home-road-map-scroll-button
        direction="right"
        @mousedown="scrollToRightMouseDown"
        @mouseup="scrollToRightMouseUp"
        @mouseleave="scrollToRightMouseUp"
      />
    </div>
    <ul class="scroll" :style="scrollStyleList" ref="scrollRef">
      <home-road-map-point
        v-for="(point, index) in points"
        :key="index"
        :status="point.status"
        :label="point.label"
        :type="point.type"
      />
    </ul>
    <div class="button -right">
      <home-road-map-scroll-button
        direction="left"
        @mousedown="scrollToLeftMouseDown"
        @mouseup="scrollToLeftMouseUp"
        @mouseleave="scrollToLeftMouseUp"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import HomeRoadMapPoint, { RoadmapPointType } from './HomeRoadMapPoint.vue'
import HomeRoadMapScrollButton from './HomeRoadMapScrollButton.vue'

const points: {
  status: string,
  label: string,
  type: RoadmapPointType,
}[] = [
  {
    status: 'Complited',
    label: 'Idea',
    type: 'end',
  },
  {
    status: 'Complited',
    label: 'Pitch Deck',
    type: 'last',
  },
  {
    status: 'Q4 2022',
    label: 'Whitepaper',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Brand creating',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Team hiring',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Contracts development',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Main website (MVP)',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Presale',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Listing',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Launch Staking',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'NFT achievements',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Launch auto buy back and burning',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Smart contracts audits',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Auto-invest',
    type: 'wait',
  },
  {
    status: 'Q4 2022',
    label: 'Turn off TX tax and launch DEX',
    type: 'wait',
  },
]

const lastIndex = points.findIndex(({type}) => type === 'last')
const pointWidth = 200

export default defineComponent({
  name: 'home-road-map-scroll',
  setup() {
    const scrollRef = ref<HTMLDivElement>()
    let isScrollToLeftMouseDown = false
    let isScrollToRightMouseDown = false

    onMounted(() => scrollRef.value.scrollLeft = lastIndex * pointWidth)

    const scrollToLeft = () => {
      if (!isScrollToLeftMouseDown) {
        return
      }

      scrollRef.value.scrollBy({
        left: pointWidth,
        behavior: 'smooth',
      })

      setTimeout(scrollToLeft, 300)
    }

    const scrollToRight = () => {
      if (!isScrollToRightMouseDown) {
        return
      }
  
      scrollRef.value.scrollBy({
        left: -pointWidth,
        behavior: 'smooth',
      })

      setTimeout(scrollToRight, 300)
    }

    const scrollToLeftMouseDown = () => {
      isScrollToLeftMouseDown = true
      scrollToLeft()
    }

    const scrollToLeftMouseUp = () => {
      isScrollToLeftMouseDown = false
    }

    const scrollToRightMouseDown = () => {
      isScrollToRightMouseDown = true
      scrollToRight()
    }

    const scrollToRightMouseUp = () => {
      isScrollToRightMouseDown = false
    }

    const scrollStyleList = {gridTemplateColumns: `repeat(${points.length},${pointWidth}px)`}
    return { points, scrollStyleList, scrollRef, scrollToRightMouseDown, scrollToRightMouseUp, scrollToLeftMouseUp, scrollToLeftMouseDown }
  },
  components: {
    HomeRoadMapPoint,
    HomeRoadMapScrollButton,
  }
})
</script>

<style scoped>
.home-roadmap-scroll {
  @apply relative;
}

.home-roadmap-scroll::before {
  content: '';

  top: 81px;
  width: calc(100% - 24px);
  background: linear-gradient(to right, hsl(0 0% 0% / 0), #fff 48px, #fff calc(100% - 48px), hsl(0 0% 0% / 0) );
  @apply block h-2 absolute left-0 mx-12;
}


.home-roadmap-scroll > .button {
  width: 120px;
  height: 90px;
  @apply absolute bottom-0 bg-black flex z-10 items-center;
}

.home-roadmap-scroll > .button.-left {
  mask-image: radial-gradient(circle at 0%, rgba(0,0,0,1) calc(100% - 40px), rgba(0,0,0,0) calc(100% - 10px));
  @apply left-0 justify-start;
}

.home-roadmap-scroll > .button.-right {
  mask-image: linear-gradient(to left, hsl(0 0% 0% / 1) calc(100% - 20px), hsl(0 0% 0% / 0) );

  @apply right-0 justify-end;
}

.home-roadmap-scroll.-desktop > .scroll {
  @apply snap-x snap-mandatory grid grid-flow-col whitespace-nowrap overflow-auto overflow-x-scroll pb-8;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 24px;
  padding-left: 120px;
  padding-right: 120px;
  scroll-padding: 0 120px 0 120px;

  mask-image: linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 0) 8px, hsl(0 0% 0% / 1) 40px, hsl(0 0% 0% / 1) calc(100% - 40px), hsl(0 0% 0% / 0) );
}

/* For Webkit-based browsers (Chrome, Safari and Opera) */
.home-roadmap-scroll > .scroll::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.home-roadmap-scroll > .scroll {

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>