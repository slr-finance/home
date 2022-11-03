<template>
  <ui-header
    :desktop-menu="links"
    :mobile-menu="links"
  >
    <template #action>
      <ui-button
        variant="white"
        :size="48"
        href="https://app.slr.finance"
      >
        Launch App
      </ui-button>
    </template>
    
    <template #mobile-action>
      <ui-button
        variant="white"
        :size="48"
        href="https://app.slr.finance"
      >
        Launch App
      </ui-button>
    </template>
  </ui-header>
</template>

<script lang="ts">
import type { UiLinkProps } from '@slr-finance/uikit'
import { defineComponent } from 'vue'
import { UiHeader, UiButton } from '@slr-finance/uikit'

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
