<template>
  <div ref="svg">
    <svg v-bind="svgData.svgAttrs">
      <path
        :d="svgData.d"
        fill="none"
        stroke-width="12px"
        stroke-linecap="round"
        stroke-dasharray="1000"
        stroke-dashoffset="1000"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { templateRef, useResizeObserver } from '@vueuse/core'
import { defineComponent, computed, ref } from 'vue'

class SvgPath {
  private path:string = ''
  private lastX:number
  private lastY:number
  private offset = { l: 0, t: 0 }

  constructor(x:number = 0, y:number = 0) {
    this.path = `M ${x} ${y}`
  }
  
  /**
   * Рисует дугу
   * 
   * номера углов:  
   *   0|1
   *   ---
   *   2|3
   */
  public q(a:0|1|2|3, toX:number, toY:number) {
    let lx:number
    let ly:number
    
    switch (a) {
      case 0: {
        throw new Error('[SvgPath]: not implemented')
        break  
      }
      case 1: {
        lx = toX
        ly = this.lastY
        break
      }
      case 2: {
        lx = this.lastX
        ly = toY
        break
      }
      case 3: {
        lx = this.lastX
        ly = toY
        break
      }
      default:{
        throw new Error('[SvgPath.q]: unknown props "a"')
      }
    }

    return this.moveTo('Q', lx, ly, toX, toY)
  }

  /**
   * Проводит линию от курсора к указанным координатам
   */
  public l(toX:number, toY:number) {
    return this.moveTo('L', toX, toY)
  }

  /**
   * Перемещает курсор
   */
  public m(toX:number, toY:number) {
    return this.moveTo('M', toX, toY)
  }

  /**
   * все создаваемые точки после вызова этого метода будут смещены по x на l, а по y на t.
   * Что бы сборсить смещение вызови метод c нулями setOffset(0, 0)
   */
  public setOffset(l: number, t: number) {
    this.offset.l = l
    this.offset.t = t

    return this
  }

  public toString() { return this.path }

  private moveTo(modifier: 'M'|'L'|'Q', ...points:number[]) {
    const length = points.length

    if (length % 2 !== 0 || length < 2) {
      throw new Error(`[SvgPath.moveTo]: incorrect points \n${JSON.stringify(points)}`)
    }
    
    this.path = `${this.path} ${modifier} ${points.map((point, index) => point +(index % 2 === 0 ? this.offset.l : this.offset.t)).join(' ')}`
    this.lastX = points[length - 2]
    this.lastY = points[length - 1]

    return this
  }
}

export default defineComponent({
  name: 'landing-svg-road',
  setup() {
    const svgRef = templateRef('svg')
    const svgSize = ref({ width: 0, height: 0 })
  
    useResizeObserver(svgRef, ([entry]) => {
      svgSize.value = {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }
    })

    const svgData = computed(() => {
      const svgSizeVal = svgSize.value
      const svgOffsetX = 12
      const treeColSpace = 100
      const width = svgSizeVal.width - svgOffsetX
      const angleSize = 50
      const topOffset = 80
      const treeCollWidth = width / 3
      const treeCollCenter = treeCollWidth / 2

      const firstBlocksSpace = 800

      const d = new SvgPath()
        .setOffset(treeCollCenter, topOffset)

        .m(0, 0)
        .l(0, treeColSpace - angleSize)
        .q(2, angleSize, treeColSpace)
        .l(treeCollWidth + angleSize, treeColSpace)

        .m(treeCollWidth, 0)
        .l(treeCollWidth, treeColSpace - angleSize)
        .q(2, treeCollWidth + angleSize, treeColSpace)
        .l(treeCollWidth + treeCollWidth + angleSize, treeColSpace)

        .m(treeCollWidth + treeCollWidth, 0)
        .l(treeCollWidth + treeCollWidth, treeColSpace - angleSize)
        .q(2, treeCollWidth + treeCollWidth + angleSize, treeColSpace)

        .setOffset(0, topOffset)

        .l(width - angleSize, treeColSpace)
        .q(1, width, treeColSpace + angleSize)
        .l(width, firstBlocksSpace - angleSize - angleSize)

        .q(3, width - angleSize, firstBlocksSpace - angleSize)
      .toString()

      const svgAttrs = {
        width: `${svgSizeVal.width}`,
        height: `${svgSizeVal.height}`,
      }

      return { d, svgAttrs }
    })

    return { svgData }
  },
})
</script>

<style scoped>
path {
  @apply stroke-gray-800;
  animation: dash 2s linear forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>