<template>
  <nuxt-layout>
    <nuxt-page/>
  </nuxt-layout>
</template>

<script lang="ts">
import 'virtual:svg-icons-register'

import { defineComponent } from 'vue'
import './index.postcss'
import './components/ui/index.postcss'

export default defineComponent({ name: 'app' })
</script>
