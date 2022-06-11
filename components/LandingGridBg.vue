<template>
  <canvas ref="canvas" class="bg-black"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref } from 'vue'
import { useResizeObserver, useRafFn, templateRef, useIntersectionObserver } from '@vueuse/core'

const gridColor = '#1B1B1B'
const rayColor = '#2B2B2B'
const mainBgColor = 'black'
const bgGlowColor = '#101010'

let pixelRatio = 1

if (typeof window !== 'undefined') {
  pixelRatio = window.devicePixelRatio || 1
}

const calcLinePoinst = (x:number, centerX: number, width: number, height: number) => {
  const clampX = Math.min(width, Math.max(0, x)) - centerX 
  const d = clampX / centerX * (width / 1920) * 1000 * pixelRatio
  const x1 = x + d

  return [x, 0, x1, height]
}

const interpolate = (a:number, b:number, d: number) => a * (1 - d) + b * d

const drawStaticLayer = (ctx:CanvasRenderingContext2D, width: number, height: number, centerX:number, colSize:number, rowSize: number, time: number) => {
  const rate = height / width

  const bgGradient = ctx.createRadialGradient(centerX, 0, centerX, centerX, 0, width);
  bgGradient.addColorStop(0, bgGlowColor);
  bgGradient.addColorStop(1, mainBgColor);

  ctx.fillStyle = bgGradient;
  ctx.setTransform(1,0,0, rate,0,0)
  ctx.fillRect(0,0,width,width)
  ctx.setTransform(1,0,0, 1, 0,0)

  ctx.strokeStyle = gridColor
  ctx.lineWidth = 1

  ctx.beginPath()

  const ttime = (time / 200)
  const offest = ttime % colSize

  for(let x = offest; x <= width + offest; x+=colSize) {
    const [x1, y1, x2, y2] = calcLinePoinst(x, centerX, width, height)
    
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
  }

  /// create horizontal lines
  let y = 0
  let rowIndex = 0
  
  while(y < height) {
    y += rowSize + rowIndex * 15
    rowIndex++
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }

  ctx.stroke()
}

const drawRay = (
  ctx:CanvasRenderingContext2D,
  width: number,
  height: number,
  colSize:number,
  colIndex:number,
  time: number
) => {
  const centerX = Math.ceil(width / 2)
  const pause = 9000
  const duration = 10000 + pause

  const d = Math.min(1, ((time + 8000 * colIndex) % duration) / (duration - pause))
  const tailOffset = 0.2

  const d1 = Math.max(Math.min(d + tailOffset, 1) - tailOffset, 0) / (1 - tailOffset)
  const d2 = Math.max(d - tailOffset, 0) / (1 - tailOffset)

  const ttime = time / 200
  const offestX = ttime % colSize
  const col = (colIndex + Math.ceil((ttime / colSize))) % (Math.floor(width / colSize))
  let x = colSize * col + offestX

  const [x0, y0, x1, y1] = calcLinePoinst(x, centerX, width, height)

  const interpolateX0 = interpolate(x1, x0, d1)
  const interpolateX1 = interpolate(x1, x0, d2)
  const interpolateY0 = interpolate(y1, y0, d1)
  const interpolateY1 = interpolate(y1, y0, d2)
  
  ctx.beginPath()
  ctx.moveTo(interpolateX0, interpolateY0)
  ctx.lineTo(interpolateX1, interpolateY1)

  const gradient = ctx.createLinearGradient(
    0, interpolateY0,
    0, interpolateY1,
  );

  gradient.addColorStop(0, rayColor)
  gradient.addColorStop(0.2, rayColor)
  gradient.addColorStop(1, 'transparent')

  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.strokeStyle = gradient
  ctx.stroke()
}

const drawVignette = (ctx:CanvasRenderingContext2D, width: number, height: number, centerX: number) => {
  const rate = height / width

  const bgGradient = ctx.createRadialGradient(centerX, centerX / 1.4, 0, centerX, centerX / 1.4, centerX * 1.3);
  bgGradient.addColorStop(0.8, 'transparent');
  bgGradient.addColorStop(1, mainBgColor);

  ctx.fillStyle = bgGradient;
  ctx.setTransform(1,0,0, rate, 0,0)
  ctx.fillRect(0,0,width,width)
  ctx.setTransform(1,0,0, 1,0,0)
}

export default defineComponent({
  name: 'landing-grid-bg',
  setup() {
    const canvasRef = templateRef('canvas') as Readonly<Ref<null|HTMLCanvasElement>>
    let width = 0
    let height = 0
    let ctx:null|CanvasRenderingContext2D = null
    let canvasEl:null|HTMLCanvasElement = null
    let cols = 0
    let rowSize = 40
    let centerX = Math.ceil(width / 2)
    const colSize = 140 * pixelRatio

    useResizeObserver(canvasRef, ([entry]) => {
      if (!canvasEl || !ctx) {
        return
      }

      width = entry.contentRect.width * pixelRatio
      height = entry.contentRect.height * pixelRatio
      centerX = Math.ceil(width / 2)
      cols = Math.ceil(width / colSize)

      canvasEl.width = width
      canvasEl.height = height
    })

    const pausable = useRafFn(() => {
      if (!canvasEl || !ctx) {
        return
      }
      const time = Date.now()

      ctx.clearRect(0, 0, width, height)
      drawStaticLayer(ctx, width, height, centerX, colSize, rowSize, time)

      for (let index = 1; index < cols; index++) {
        drawRay(ctx, width, height, colSize, index, time)
      }

      drawVignette(ctx, width, height, centerX)
    })

    useIntersectionObserver(
      canvasRef, 
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          pausable.resume()
        } else {
          pausable.pause()
        }
      },
      { threshold: 0.15 }
    )

    onMounted(() => {
      canvasEl = canvasRef.value

      if (!canvasEl) {
        throw new Error()
      }

      ctx = canvasEl.getContext('2d', { alpha: false })
    })
  },
})
</script>
