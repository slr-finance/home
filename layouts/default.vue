<template>
  <div :style="styleList">
    <app-header />
    <slot/>

    <app-footer/>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { UiHeaderType, useUiHeader } from '@slr-finance/uikit'

const { isDesktop } = useBreakpoints({ isDesktop: 750 })
const { setHeaderType } = useUiHeader()

watch(
  isDesktop,
  (isDesktopVal) => setHeaderType(isDesktopVal ? UiHeaderType.DEFAULT_DESKTOP : UiHeaderType.DEFAULT_MOBILE),
  { immediate: true },
)

const styleList = ref({ display: 'none' })

onMounted(() => {
  if (typeof window !== 'undefined') {
    styleList.value = { display: 'block' }
  }
})
</script>
