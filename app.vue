<template>
  <nuxt-layout>
    <nuxt-page/>
  </nuxt-layout>
</template>

<script lang="ts" setup>
// import 'virtual:svg-icons-register'
import './index.postcss'
import './components/ui/index.postcss'
import '@slr-finance/uikit/styles'
import { initReferral } from 'slr-finance-ui-share/src/libs/referral'
import { MetaObject } from '#app'

const route = useRoute()

if (typeof window !== 'undefined') {
  initReferral()
}

const defaultSocialMediaDescription = 'Amazing DeFi planets system'
const defaultSocialMediaImage = 'https://slr.finance/home/screenshot/bg1x.jpg'

useHead(computed(() => {
  const g:MetaObject = {
    title: route.meta.title,
    titleTemplate: (title) => `${title} | SLR.Finance`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'description', content: 'Amazing DeFi planets system' },
      { name: 'og:title', content: `SLR.Finance - ${route.meta.title}` },
      { name: 'twitter:title', content: `SLR.Finance - ${route.meta.title}` },
      { name: 'og:description', content: defaultSocialMediaDescription },
      { name: 'twitter:description', content: defaultSocialMediaDescription },
      { name: 'og:image', content: defaultSocialMediaImage },
      { name: 'twitter:image', content: defaultSocialMediaImage },
    ],
  }

  return g
}))
</script>
