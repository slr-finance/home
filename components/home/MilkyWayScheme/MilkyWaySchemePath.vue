<template>
  <div ref="root">
    <svg
      ref="svg"
      class="w-full h-full"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref="path"
        fill="none"
        :stroke-width="`${strokeWidth}px`"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { templateRef, useIntersectionObserver, useResizeObserver } from '@vueuse/core'
import { defineComponent, ref, Ref, watch } from 'vue'

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
    
    this.path = `${this.path} ${modifier} ${points.map((point, index) => point + (index % 2 === 0 ? this.offset.l : this.offset.t)).join(' ')}`
    this.lastX = points[length - 2]
    this.lastY = points[length - 1]

    return this
  }
}

export default defineComponent({
  name: 'milky-way-scheme-path',
  props: {
    strokeWidth: {
      type: Number,
      default: 1,
    }
  },
  setup(props) {
    const pathRef = templateRef('path') as Readonly<Ref<SVGPathElement>>
    const svgRef = templateRef('svg') as Readonly<Ref<SVGElement>>
    const rootRef = templateRef('root')
    const svgSize = ref({ width: 0, height: 0 })
  
    useResizeObserver(rootRef, ([entry]) => {
      svgSize.value = {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }
    })

    useIntersectionObserver(
      rootRef,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          rootRef.value.classList.add('-shown')
        }
      },
      { threshold: 0.4 }
    )

    watch(
      [svgSize, () => props.strokeWidth],
      ([{ width, height }, strokeWidth], oldVal, onCleanup) => {
        const [{ value: pathEl }, { value: svgEl }] = [pathRef, svgRef]

        if (!pathEl || !svgEl) {
          return
        }

        // [BEGIN] Build path
        const svgSizeVal = svgSize.value
        const treeColSpace = 100
        const areaWidth = svgSizeVal.width - strokeWidth / 2
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

          .l(areaWidth - angleSize, treeColSpace)
          .q(1, areaWidth, treeColSpace + angleSize)
          .l(areaWidth, firstBlocksSpace - angleSize - angleSize)

          .q(3, areaWidth - angleSize, firstBlocksSpace - angleSize)
        .toString()
        // [END] Build path

        pathEl.setAttribute('d', d)

        const totalLength = pathEl.getTotalLength().toString()

        pathEl.setAttribute('stroke-dasharray', totalLength)
        pathEl.setAttribute('stroke-dashoffset', totalLength)

        svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`)
      }
    )
  },
})
</script>

<style scoped>
path {
  @apply stroke-gray-800;
}

.-shown path {
  animation: dash 2s linear forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>