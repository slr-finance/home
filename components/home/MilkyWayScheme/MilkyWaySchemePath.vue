<template>
  <div
    ref="root"
    :class="classList"
  >
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
  private savedCursor = { x: 0, y: 0 }
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

  public saveCursor() {
    this.savedCursor = {
      x: this.lastX,
      y: this.lastY,
    }

    return this
  }

  public restoreCursor() {
    this.moveTo('M', this.savedCursor.x, this.savedCursor.y)

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
    },
    elementsPositions: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
    }
  },
  setup(props) {
    const pathRef = templateRef('path') as Readonly<Ref<SVGPathElement>>
    const svgRef = templateRef('svg') as Readonly<Ref<SVGElement>>
    const rootRef = templateRef('root')
    const svgSize = ref({ width: 0, height: 0 })
    const classList = computed(() => ({ '-shown': props.show }))
  
    useResizeObserver(rootRef, ([entry]) => {
      svgSize.value = {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }
    })

    watch(
      [svgSize, () => props.strokeWidth, () => props.elementsPositions],
      ([{ width, height }, strokeWidth, elementsPositions], oldVal, onCleanup) => {
        const [{ value: pathEl }, { value: svgEl }] = [pathRef, svgRef]

        if (!pathEl || !svgEl) {
          return
        }

        // [BEGIN] Build path
        const feesWrapper = {
          left: elementsPositions.feesWrapper.x,
          bottom: elementsPositions.feesWrapper.y + elementsPositions.feesWrapper.h,
          rowHeight: elementsPositions.feesWrapper.h / 3,
          rowCenterY: elementsPositions.feesWrapper.h / 6,
        }
        const milkyWay = {
          x: elementsPositions.milkyWay.x + elementsPositions.milkyWay.w / 2,
          y: elementsPositions.milkyWay.y + elementsPositions.milkyWay.h / 2,
          left: elementsPositions.milkyWay.x,
          right: elementsPositions.milkyWay.x + elementsPositions.milkyWay.w,
        }

        const invest = {
          top: elementsPositions.invest.y,
          bottom: elementsPositions.invest.y + elementsPositions.invest.h,
        }

        const buyBack = {
          top: elementsPositions.buyBack.y,
          y: elementsPositions.buyBack.y + elementsPositions.buyBack.h / 2,
        }

        const feesItemsY = elementsPositions.feesItems.map(({y, h}) => y + h / 2)


        const angleSize = 24

        const d = new SvgPath()
          // Fees
          .m(milkyWay.x, milkyWay.y)
          .l(milkyWay.right - angleSize, milkyWay.y)
          .q(1, milkyWay.right, milkyWay.y - angleSize)
          .saveCursor()
          .l(milkyWay.right, feesItemsY[2] + angleSize)
          .q(2, milkyWay.right + angleSize, feesItemsY[2])
          .l(feesWrapper.left, feesItemsY[2])
          .restoreCursor()
          .l(milkyWay.right, feesItemsY[1] + angleSize)
          .q(2, milkyWay.right + angleSize, feesItemsY[1])
          .l(feesWrapper.left, feesItemsY[1])
          .restoreCursor()
          .l(milkyWay.right, feesItemsY[0] + angleSize)
          .q(2, milkyWay.right + angleSize, feesItemsY[0])
          .l(feesWrapper.left, feesItemsY[0])

          // Invest
          .m(milkyWay.x, milkyWay.y)
          .l(50 + angleSize, milkyWay.y)
          .q(1, 50, milkyWay.y + angleSize)
          .l(50, invest.bottom - angleSize + 24)
          .q(2, 50 + angleSize, invest.bottom + 24)
          .setOffset(0, 0)
          .l(milkyWay.x - angleSize, invest.bottom + 24)
          .q(1, milkyWay.x, invest.bottom + angleSize + 24)
          // BayBack
          .m(milkyWay.x, milkyWay.y)
          .l(milkyWay.x, buyBack.y)
        .toString()
        // [END] Build path

        pathEl.setAttribute('d', d)

        const totalLength = pathEl.getTotalLength().toString()

        pathEl.setAttribute('stroke-dasharray', totalLength)
        pathEl.setAttribute('stroke-dashoffset', totalLength)

        svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`)
      }
    )

    return { classList }
  },
})
</script>

<style scoped>
path {
  @apply stroke-gray-800;
}

.-shown path {
  animation: dash 7s linear forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>