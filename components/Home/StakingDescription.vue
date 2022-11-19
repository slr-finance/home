<template>
  <div>
    <app-landing-title
      text="Earn on fixed APY ⤈space |staking|"
      style="max-width: 770px"
    >
      <template #description>
        Unique multi-level staking. Discover new planets and increase 
        <span class="text-white inline-flex">
          APY to&nbsp;
          <ui-text-placeholder :text-length="5"/>%.
        </span>
        Earn with auto compounding with a large fixed APY.
      </template>
    </app-landing-title>
  </div>
</template>

<script lang="ts">
import { UiTextPlaceholder } from '@slr-finance/uikit';
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },

  components: {
    UiTextPlaceholder,
  }
})
</script>
