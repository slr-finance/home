<template>
  <div
    ref="root"
    class="home-milky-way-scheme-path"
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
        class="stroke-gray-800"
        :stroke-width="`${strokeWidth}px`"
        stroke-linecap="round"
        color-rendering="optimizeSpeed"
        shape-rendering="optimizeSpeed"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { templateRef, useResizeObserver } from '@vueuse/core'
import { defineComponent, ref, Ref, watch } from 'vue'

enum SvgPathPointType {
  line,
  move,
}

type Point = {
  x: number,
  y: number,
}

type Cmd = (string|number)[]

class CurveCmd extends Array<string|number> {
  origPoint: Point = { x:0, y: 0 }

  constructor(...params:Cmd) {
    super()

    this.push(...params)
  }
}

class SvgPath {
  private lastCursor: [number, number] = [0, 0] // x, y
  private savedCursor: [number, number] = [0, 0] // x, y
  private offset = { l: 0, t: 0 }
  private p: {t: SvgPathPointType, p:number[]}[] = []

  /**
   * Проводит линию от курсора к указанным координатам
   */
  public l(toX:number, toY:number) {
    this.lastCursor = [toX, toY]
    this.p.push({t: SvgPathPointType.line, p: [toX, toY]})
    
    return this
  }

  /**
   * Перемещает курсор
   */
  public m(toX:number, toY:number) {
    this.lastCursor = [toX, toY]
    this.p.push({t: SvgPathPointType.move, p: [toX, toY]})

    return this
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
    this.savedCursor = [ ...this.lastCursor ]

    return this
  }

  public restoreCursor() {
    this.p.push({t: SvgPathPointType.move, p: this.savedCursor})

    return this
  }

  private getPart(modifier: 'M'|'L'|'Q', points:number[]):Cmd {
    const length = points.length

    if (length % 2 !== 0 || length < 2) {
      throw new Error(`[SvgPath.moveTo]: incorrect points \n${JSON.stringify(points)}`)
    }

    return [modifier, ...points.map((point, index) => point + (index % 2 === 0 ? this.offset.l : this.offset.t))]
  }

  public build() {
    const pathParts = this.p.reduce((parts, point) => {
      if (point.t === SvgPathPointType.line) {
        parts.push(...this.getPart('L', point.p))
      } else if (point.t === SvgPathPointType.move) {
        parts.push(...this.getPart('M', point.p))
      }

      return parts
    }, [] as Cmd)

    const useFractionalRadius = false
    const radius = 20
  
  // Group the commands with their arguments for easier handling
    const commands = pathParts.reduce((commands, part) => {
      if (Number(part).toString() == part && commands.length) {
        commands[commands.length - 1].push(part)
      } else {
        commands.push([part])
      }
      
      return commands
    }, [])
    
    // The resulting commands, also grouped
    let resultCommands: CurveCmd[] = []
    
    if (commands.length > 1) {
      const startPoint = this.pointForCommand(commands[0])
      
      // Handle the close path case with a "virtual" closing line
      let virtualCloseLine: null|Cmd = null;
      if (commands[commands.length - 1][0] == 'Z' && commands[0].length > 2) {
        virtualCloseLine = ['L', startPoint.x, startPoint.y]
        commands[commands.length - 1] = virtualCloseLine
      }
      
      // We always use the first command (but it may be mutated)
      resultCommands.push(commands[0])
      
      for (let cmdIndex=1; cmdIndex < commands.length; cmdIndex++) {
        const prevCmd = resultCommands[resultCommands.length - 1]
        const curCmd:CurveCmd = commands[cmdIndex]
        
        // Handle closing case
        const nextCmd = (curCmd == virtualCloseLine)
          ? commands[1]
          : commands[cmdIndex + 1]
        
        // Nasty logic to decide if this path is a candidite.
        if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] == 'L' && nextCmd.length > 2 && nextCmd[0] == 'L') {
          // Calc the points we're dealing with
          const prevPoint = this.pointForCommand(prevCmd)
          const curPoint = this.pointForCommand(curCmd)
          const nextPoint = this.pointForCommand(nextCmd)
          
          // The start and end of the cuve are just our point moved towards the previous and next points, respectivly
          let curveStart: Point
          let curveEnd: Point
          
          if (useFractionalRadius) {
            curveStart = this.moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, radius)
            curveEnd = this.moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, radius)
          } else {
            curveStart = this.moveTowardsLength(curPoint, prevPoint, radius)
            curveEnd = this.moveTowardsLength(curPoint, nextPoint, radius)
          }
          
          // Adjust the current command and add it
          this.adjustCommand(curCmd, curveStart)
          curCmd.origPoint = curPoint
          resultCommands.push(curCmd)
          
          // The curve control points are halfway between the start/end of the curve and
          // the original point
          const startControl: Point = this.moveTowardsFractional(curveStart, curPoint, .5)
          const endControl: Point = this.moveTowardsFractional(curPoint, curveEnd, .5)
    
          // Create the curve 
          const curveCmd = new CurveCmd('C', startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y)
          // Save the original point for fractional calculations
          curveCmd.origPoint = curPoint
          resultCommands.push(curveCmd)
        } else {
          // Pass through commands that don't qualify
          resultCommands.push(curCmd)
        }
      }
      
      // Fix up the starting point and restore the close path if the path was orignally closed
      if (virtualCloseLine) {
        const newStartPoint = this.pointForCommand(resultCommands[resultCommands.length-1])

        resultCommands.push(new CurveCmd('Z'))
        this.adjustCommand(resultCommands[0], newStartPoint)
      }
    } else {
      resultCommands = commands;
    }
    
    return resultCommands.reduce(
      (str, c) => `${str}${c.join(' ')} `,
      '',
    )
  }



  private moveTowardsLength(movingPoint: Point, targetPoint: Point, amount:number):Point {
    const width = (targetPoint.x - movingPoint.x)
    const height = (targetPoint.y - movingPoint.y)
    
    const distance = Math.sqrt(width**2 + height**2)
    
    return this.moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
  }
  
  private moveTowardsFractional(movingPoint: Point, targetPoint: Point, fraction: number):Point {
    return {
      x: movingPoint.x + (targetPoint.x - movingPoint.x)*fraction,
      y: movingPoint.y + (targetPoint.y - movingPoint.y)*fraction
    };
  }
  
  // Adjusts the ending position of a command
  private adjustCommand(cmd:Cmd, newPoint:Point) {
    if (cmd.length > 2) {
      cmd[cmd.length - 2] = newPoint.x;
      cmd[cmd.length - 1] = newPoint.y;
    }
  }
  
  // Gives an {x, y} object for a command's ending position
  private pointForCommand(cmd:Cmd): Point {
    return {
      x: Number(cmd[cmd.length - 2]),
      y: Number(cmd[cmd.length - 1]),
    };
  }
}

export default defineComponent({
  name: 'home-milky-way-scheme-path',
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
        const milkyWay = {
          x: elementsPositions.milkyWay.x + elementsPositions.milkyWay.w / 2,
          y: elementsPositions.milkyWay.y + elementsPositions.milkyWay.h / 2,
          left: elementsPositions.milkyWay.x,
          right: elementsPositions.milkyWay.x + elementsPositions.milkyWay.w,
        }

        const feesWrapperLeft = elementsPositions.feesWrapper.x
        const halfColSpace = (feesWrapperLeft - milkyWay.right) / 2
        const vertFeeRay = milkyWay.right + halfColSpace

        const invest = {
          top: elementsPositions.invest.y,
          bottom: elementsPositions.invest.y + elementsPositions.invest.h,
        }

        const buyBack = {
          top: elementsPositions.buyBack.y,
          y: elementsPositions.buyBack.y + elementsPositions.buyBack.h / 2,
        }

        const feesItemsCenter = elementsPositions.feesItems.map(({y, h, x, w}) => ({
          y: y + h / 2,
          x: x + w / 2,
        }))
        const investIconWrapX = elementsPositions.investIconWrap.x + elementsPositions.investIconWrap.w / 2

        const da = (d) => {
          return d
            
        }

        let d = new SvgPath()
          // Fees
          .m(milkyWay.x, milkyWay.y)
          .saveCursor()
          .l(vertFeeRay, milkyWay.y)
          .l(vertFeeRay, feesItemsCenter[2].y)
          .l(feesItemsCenter[2].x, feesItemsCenter[2].y)
          .restoreCursor()
          .l(vertFeeRay, milkyWay.y)
          // .l(vertFeeRay, feesItemsCenter[2].y)
          .l(vertFeeRay, feesItemsCenter[1].y)
          .l(feesItemsCenter[1].x, feesItemsCenter[1].y)
          .restoreCursor()
          .l(vertFeeRay, milkyWay.y)
          //.l(vertFeeRay, feesItemsCenter[2].y)
          .l(vertFeeRay, feesItemsCenter[0].y)
          .l(feesItemsCenter[0].x, feesItemsCenter[0].y)

          // Invest
          .m(milkyWay.x, milkyWay.y)
          .l(investIconWrapX, milkyWay.y)
          .l(investIconWrapX, invest.bottom)
          .l(milkyWay.x, invest.bottom)
          .l(milkyWay.x, buyBack.y)
          // BayBack
          .m(milkyWay.x, milkyWay.y)
          .l(milkyWay.x, buyBack.y)
        .build()
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

<style lang="postcss" scoped>
.home-milky-way-scheme-path {
  content-visibility: auto;
}

.home-milky-way-scheme-path.-shown path {
  animation: home-milky-way-scheme-path-dash 7s linear forwards;
}

@keyframes home-milky-way-scheme-path-dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>