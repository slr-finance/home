<template>
  <div class="mx-ui-page-spacing flex flex-col items-center">
    <h1 v-if="error.statusCode === '404'">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: Object
})

useHead({
  title: 'Ooops | SLR.Finance',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
})
</script>