<template>
  <div class="px-ui-page-spacing">
    <ui-footer
      :links="links"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UiFooter } from '@slr-finance/uikit'

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
  }
})
</script>
