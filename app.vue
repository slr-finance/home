<template>
  <home-bg/>
  <div class="text-box">
    <div class="heading">Slr.Finance</div>
    <div class="button-wrapper">
        <a href="https://app.slr.finance" class="button">Launch app</a>
        <a href="https://docs.slr.finance" class="button">Docs</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeBg from './components/HomeBg.vue'

export default defineComponent({
  components: {
    HomeBg,
  }
})
</script>


<style>
body, html {
  background: black;
  padding: 0;
  margin: 0;
}

.text-box {
  text-align: left;
  left: 0;
  top: 20%;
  z-index: 2;
  font-size: 60px;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 7px;
  word-spacing: 12px;
  text-transform: uppercase;
  color:rgb(238, 238, 238);
}
.button-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  flex-direction: row;
}
.button {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  margin-left:20px;
  margin-right:20px;
  word-spacing: normal;
  letter-spacing: 5px;
  border: 1px solid white;
  background: black;
  cursor: pointer;
}
</style>