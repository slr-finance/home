<template>
  <ui-desktop-header v-if="isDesktop">
    <template #action>
      <slot name="action" />
    </template>
  </ui-desktop-header>
  <!-- <app-header-mobile v-else /> -->
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, watch } from 'vue'
  // import AppHeaderMobile from './AppHeaderMobile.vue'
  import { HeaderType, useHeader } from './hooks/useHeader'

  export default defineComponent({
    props: {
      isDesktop: {
        type: Boolean,
        required: true,
      },
    },
    setup(props) {
      const { setHeaderType } = useHeader()

      watch(
        () => props.isDesktop,
        (isDesktop) => setHeaderType(isDesktop ? HeaderType.DEFAULT_DESKTOP : HeaderType.DEFAULT_MOBILE),
        { immediate: true },
      )
    },
    components: {
      UiDesktopHeader: defineAsyncComponent({
        loader: () => import('./UiDesktopHeader.vue'),
      }),
      // AppHeaderMobile,
    },
  })
</script>
