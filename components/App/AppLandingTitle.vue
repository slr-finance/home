<template>
  <div>
    <h1 class="text-ui-page-large-title text-gray font-title leading-140 uppercase mb-24 inline-block relative selection:bg-green-atomic selection:bg-opacity-50 selection:text-white">
      <slot/>
    </h1>
    <p class="text-gray text-ui-page-large-label mb-36 selection:bg-green-atomic selection:text-black">
      <slot name="description"/>
    </p>
  </div>
</template>