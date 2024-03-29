<template>
  <component
    :is="componentName"
    v-bind="componentProps"
    class="ui-link"
  >
    {{ text }} <slot />
  </component>
</template>

<script lang="ts">
  import type { RouteLocationRaw } from 'vue-router'
  import { computed, defineComponent, PropType } from 'vue'

  export type UiLinkProps = {
    text?: string
    to?: RouteLocationRaw
    href?: string
    target?: string
  }

  export default defineComponent({
    name: 'ui-link',
    inheritAttrs: true,
    props: {
      text: {
        type: String,
      },
      to: {
        type: Object as PropType<RouteLocationRaw>,
      },
      href: {
        type: String,
      },
      target: {
        type: String,
      }
    },
    setup(props) {
      const componentProps = computed(() => {
        const linkProps: Omit<UiLinkProps, 'text'> = {}

        if (props.to) {
          linkProps.to = props.to
        } else if (props.href) {
          linkProps.href = props.href
          linkProps.target = props.target
        }

        return linkProps
      })

      const componentName = computed(() => {
        return props.to ? 'router-link' : props.href ? 'a' : 'button'
      })

      return {
        componentProps,
        componentName,
      }
    },
  })
</script>

<style
  lang="postcss"
  scoped
>
  .ui-link {
    @apply outline-none text-white text-opacity-60 uikit-transition-colors uikit-duration-300 ease-out hover:ease-in;
  }

  .ui-link.router-link-exact-active,
  .ui-link.router-link-active,
  .ui-link:hover {
    @apply text-opacity-100;
  }
</style>
