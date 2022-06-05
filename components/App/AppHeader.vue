<template>
  <ui-header
    :desktop-menu="links"
  >
    <template #action>
      <ui-button
        variant="white"
        size="48"
        href="https://app.slr.finance"
      >
        Launch App
      </ui-button>
    </template>
    <template #desktop-logo>
      desktop-logo
    </template>
    <template #laptop-logo>
      laptop-logo
    </template>
    <template #mobile-logo>
      mobile-logo
    </template>
    <template #mobile-action>
      <ui-button
        variant="white"
        size="48"
        href="https://app.slr.finance"
      >
        Launch App
      </ui-button>
    </template>
  </ui-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { UiLinkProps } from '../ui/UiLink.vue'
import UiButton from '../ui/UiButton.vue'
import UiHeader from '../ui/UiHeader'

const links:UiLinkProps[] = [
  {
    text: 'Swap',
    href: 'https://app.slr.finance/swap'
  },
  {
    text: 'Presale',
    href: 'https://app.slr.finance/presale'
  },
  {
    text: 'Staking',
    href: 'https://app.slr.finance/pool'
  },
  {
    text: 'Referral',
    href: 'https://app.slr.finance/referral'
  },
]


export default defineComponent({
  name: 'app-header',
  setup() {    
    return { links }
  },
  components: {
    UiHeader,
    UiButton,
  }
})
</script>
