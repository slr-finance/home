<template>
  <canvas ref="canvasRef" style="width: 100%; height: 500px;"/>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useResizeObserver, useRafFn } from '@vueuse/core'

const fovY = 40
const gridColor = '#1B1B1B'
const rayColor = '#2B2B2B'
const mainBgColor = 'black'
const bgGlowColor = '#101010'

let pixelRatio = 1

if (process.client) {
  pixelRatio = window.devicePixelRatio || 1
}

const interpolate = (a:number, b:number, d: number) => a * (1 - d) + b * d

const drawStaticLayer = (ctx:CanvasRenderingContext2D, width: number, height: number, centerX:number, fovX:number, perspectiveRate: number) => {
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

  for(let x = -centerX; x <= centerX; x+=fovX) {
    ctx.moveTo(x + centerX, 0)
    ctx.lineTo((x * perspectiveRate) + centerX, height)
  }

  /// create horizontal lines
  for(let index = 0; index <= Math.ceil(height / fovY); index+=1) {
    const y = fovY * index * index * index / 55
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }

  ctx.stroke()
}

const drawRay = (ctx:CanvasRenderingContext2D, width: number, height: number, fovX: number, perspectiveRate:number, offset:number, col:number, time: number) => {
  const centerX = Math.ceil(width / 2)
  const pause = 9000
  const duration = 10000 + pause

  const d = Math.min(1, ((time + offset) % duration) / (duration - pause))
  const tailOffset = 0.2

  const d1 = Math.max(Math.min(d + tailOffset, 1) - tailOffset, 0) / (1 - tailOffset)
  const d2 = Math.max(d - tailOffset, 0) / (1 - tailOffset)

  let x = -centerX + fovX * col

  const x0 = x + centerX
  const x1 = (x * perspectiveRate) + centerX
  const y0 = 0
  const y1 = height

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
  setup() {
    const canvasRef = ref(null as null|HTMLCanvasElement)
    let width = 0
    let height = 0
    let ctx:null|CanvasRenderingContext2D = null
    let canvasEl:null|HTMLCanvasElement = null
    let cols = 0
    let perspectiveRate = 5.5
    let fovX = 145
    let centerX = Math.ceil(width / 2)

    useResizeObserver(canvasRef, ([entry]) => {
      if (!canvasEl || !ctx) {
        return
      }

      width = entry.contentRect.width * pixelRatio
      height = entry.contentRect.height * pixelRatio
      centerX = Math.ceil(width / 2)
      cols = Math.ceil(width / fovX)

      canvasEl.width = width
      canvasEl.height = height
    })

    useRafFn(() => {
      if (!canvasEl || !ctx) {
        return
      }

      ctx.clearRect(0, 0, width, height)
      drawStaticLayer(ctx, width, height, centerX, fovX, perspectiveRate)
      const time = Date.now()
      // первые n и последние n колонок можно пропустить, т.к. они за пределами видимости из-за затемнения
      const skipCol = 3
      const startCol = skipCol 
      const endCol = cols - skipCol

      for (let index = startCol; index < endCol; index++) {
        drawRay(ctx, width, height, fovX, perspectiveRate, 8000 * index, index, time)
      }

      drawVignette(ctx, width, height, centerX)
    })

    onMounted(() => {
      canvasEl = canvasRef.value

      if (!canvasEl) {
        throw new Error()
      }

      ctx = canvasEl.getContext('2d', { alpha: false })
    })

    return { canvasRef }
  },
})
</script>
