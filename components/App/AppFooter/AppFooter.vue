<template>
  <div class="px-ui-page-spacing">
    <ui-footer
      :links="links"
    >
      <ui-footer-token-widget
        :action="{ href: 'https://app.slr.finance/swap' }"
      />
    </ui-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UiFooter, UiFooterTokenWidget } from '@slr-finance/uikit'

const links = [
  {
    label: 'About',
    items: [
      {
        text: 'first',
        href: '#',
      },
      {
        text: 'second',
        href: '#',
      },
    ],
  },
  {
    label: 'Features',
    items: [
      {
        text: 'first',
        href: '#',
      },
      {
        text: 'second',
        href: '#',
      },
    ],
  },
  {
    label: 'Extra',
    items: [
      {
        text: 'first',
        href: '#',
      },
      {
        text: 'second',
        href: '#',
      },
    ],
  },
]

export default defineComponent({
  name: 'app-footer',
  setup() {
    return { links }
  },
  components: {
    UiFooter,
    UiFooterTokenWidget,
  }
})
</script>
