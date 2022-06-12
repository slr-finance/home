<template>
  <div :style="styleList">
    <app-header />
    <slot/>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { HeaderType, useHeader } from '~~/components/ui/UiHeader/hooks/useHeader'

const { isDesktop } = useBreakpoints({ isDesktop: 750 })
const { setHeaderType } = useHeader()

watch(
  isDesktop,
  (isDesktopVal) => setHeaderType(isDesktopVal ? HeaderType.DEFAULT_DESKTOP : HeaderType.DEFAULT_MOBILE),
  { immediate: true },
)

const styleList = ref({ display: 'none' })

onMounted(() => {
  if (typeof window !== 'undefined') {
    styleList.value = { display: 'block' }
  }
})
</script>
