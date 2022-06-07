<template>
  <nuxt-layout>
    <nuxt-page/>
  </nuxt-layout>
</template>

<script lang="ts" setup>
import 'virtual:svg-icons-register'
import './index.postcss'
import './components/ui/index.postcss'
import { initReferral } from './libs/referral'

const route = useRoute()

if (typeof window !== 'undefined') {
  initReferral()
}

useHead({
  title: '',
  titleTemplate: () => `${route.meta.title} | SLR.Finance`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'Amazing DeFi planets system' },
    { name: 'og:title', content: `SLR.Finance - ${route.meta.title}` },
  ],
})
</script>